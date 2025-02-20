// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { icon } from "leaflet";
import { FormData } from "../model/types";

// Исправляем проблему с иконкой маркера
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import { useEffect } from "react";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";

type Props = {
  setCoordinates?: (e: [number, number] | null) => void;
  formData: FormData;
};

// Создаем кастомную иконку
// const customIcon = icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// Компонент для обновления центра карты
// function MapUpdater({
//   coordinates,
// }: {
//   coordinates: [number, number] | null | undefined;
// }) {
//   const map = useMap();

//   useEffect(() => {
//     if (coordinates) {
//       map.setView(coordinates, map.getZoom());
//     }
//   }, [coordinates, map]);

//   return null;
// }

// Компонент для обработки кликов по карте
// function MapEvents({
//   setCoordinates,
// }: {
//   setCoordinates: (coords: [number, number]) => void;
// }) {
//   useMapEvents({
//     click: (e) => {
//       const { lat, lng } = e.latlng;
//       setCoordinates([lat, lng]);
//     },
//   });
//   return null;
// }

export default function MapSelector({ setCoordinates, formData }: Props) {
  const defaultPosition: [number, number] = formData?.basicInfo?.loadingLocation
    ?.coordinates || [55.75, 37.57];
  console.log("позиция изменилась", defaultPosition);

  const [center, setCenter] = useState<[number, number]>(
    formData?.basicInfo?.loadingLocation?.coordinates || [55.75, 37.57],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formData?.basicInfo?.loadingLocation?.coordinates) {
        setCenter(formData.basicInfo.loadingLocation.coordinates);
      }
    }, 500);

    return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
  }, [formData?.basicInfo?.loadingLocation?.coordinates]);

  const handleMapClick = (event: ymaps.IEvent) => {
    const coords = event.get("coords");
    if (setCoordinates) setCoordinates(coords);

    console.log("Координаты клика:", coords);
    console.log("event", event);
  };

  return (
    <div>
      <YMaps
        query={{
          apikey: "e7f81961-a083-48fe-b94f-914620e7d372",
          lang: "ru_RU",
          // load: "package.full",
          suggest_apikey: "b53c7cf5-43b8-4331-9d4f-06db83c2ce5a",
        }}
      >
        <Map
          style={{ width: "100%" }}
          className="relative ex:h-[200px] h-[calc(100vh-550px)] rounded-md overflow-hidden"
          defaultState={{ center: defaultPosition, zoom: 5 }}
          state={{ center, zoom: 5 }}
          onClick={handleMapClick}
        >
          <Placemark
            geometry={defaultPosition ?? [47.222109, 39.718813]}
            options={{
              preset: "twirl#blueIcon", // Пресет с синим значком
            }}
          />
        </Map>
      </YMaps>
      {/* <MapContainer
        center={defaultPosition}
        zoom={4}
        style={{ width: "100%", borderRadius: "8px" }}
        className="ex:h-[200px] h-[calc(100vh-400px)]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {setCoordinates && <MapEvents setCoordinates={setCoordinates} />}

        <MapUpdater
          coordinates={formData?.basicInfo?.loadingLocation?.coordinates}
        />

        {formData?.basicInfo?.loadingLocation?.coordinates && (
          <Marker
            position={formData.basicInfo.loadingLocation.coordinates}
            icon={customIcon}
          />
        )}
      </MapContainer> */}
    </div>
  );
}
