import { sortbookingAtom } from "@/pages/home/model/sort-atom";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import { useAtomValue } from "jotai";
import { useState } from "react";
import BookingDetailSheet from "../booking-detail/booking-detail-sheet";

export default function MapBackgroundYandex() {
  const sortBooking = useAtomValue(sortbookingAtom);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [openDetailBooking, setOpenDetailBooking] = useState(false);

  // Фильтруем заявки по статусу "active" ДЛЯ КАРТЫ ЧИСТО
  const filterBooking = sortBooking?.filter(
    (booking) => booking?.status === "active",
  );

  const handleMapClick = (event: ymaps.IEvent) => {
    const coords = event.get("coords");
    console.log("Координаты клика:", coords);
    console.log("event", event);
  };

  return (
    <>
      <YMaps
        query={{
          apikey: "e7f81961-a083-48fe-b94f-914620e7d372",
          lang: "ru_RU",
          // load: "package.full",
          suggest_apikey: "b53c7cf5-43b8-4331-9d4f-06db83c2ce5a",
        }}
      >
        <Map
          style={{ height: "100%", width: "100%" }}
          className="relative"
          defaultState={{
            center: [47.222109, 39.718813],
            zoom: 5,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          onClick={handleMapClick}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
        >
          <Clusterer
            options={{
              preset: "islands#blueClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {filterBooking?.map((booking) => {
              return (
                <Placemark
                  key={booking._id}
                  onClick={() => {
                    setBookingId(booking._id);
                    setOpenDetailBooking(true);
                  }}
                  geometry={
                    booking?.basicInfo?.loadingLocation?.coordinates ?? [
                      47.222109, 39.718813,
                    ]
                  }
                  options={{
                    preset: "twirl#blueIcon", // Пресет с синим значком
                  }}
                />
              );
            })}
          </Clusterer>
        </Map>
      </YMaps>
      <BookingDetailSheet
        bookingId={bookingId}
        open={openDetailBooking}
        onOpenChange={setOpenDetailBooking}
      />
    </>
  );
}
