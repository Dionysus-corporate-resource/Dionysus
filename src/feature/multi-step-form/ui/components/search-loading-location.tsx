import { Input } from "@/shared/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { FormData } from "../../model/types";
import instance from "@/shared/model/api/axios-instance";
import { LoaderCircle, RefreshCwOff } from "lucide-react";

type IPlace = {
  formatted: string;
  geometry: { lat: number; lng: number };
};

export default function SearchLoadingLocation({
  updateFormData,
  formData,
}: {
  updateFormData: (stepData: Partial<FormData>) => void;
  formData: FormData;
}) {
  const [suggestions, setSuggestions] = useState<
    { label: string; lat: number; lng: number }[]
  >([]);
  const loadingLocationName = formData?.basicInfo?.loadingLocation?.name;
  // const loadingLocationCoordinates = formData?.basicInfo?.loadingLocation?.coordinates;

  const lastQuery = useRef(""); // Для отслеживания последнего запроса
  const controller = useRef<AbortController | null>(null); // Для отмены предыдущих запросов
  const [isFetching, setIsFetching] = useState(false);

  const [activeSearch, setActiveSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setActiveSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        loadingLocationName &&
        loadingLocationName.length > 2 &&
        activeSearch
      ) {
        // Проверяем, что запрос отличается от последнего
        if (lastQuery.current !== loadingLocationName) {
          lastQuery.current = loadingLocationName;
          setIsFetching(true);
          fetchLocations(loadingLocationName);
        }
      }
      // ⏳ Ждем 1000 мс перед запросом
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [loadingLocationName, activeSearch]);

  const fetchLocations = async (query: string) => {
    console.log("Запрос на получение возможных мест");

    // Если уже был запрос, отменяем его
    if (controller.current) {
      controller.current.abort();
    }

    try {
      // Создаем новый AbortController для нового запроса
      controller.current = new AbortController();

      const response = await instance.get(`/geocode/${query}`, {
        signal: controller.current.signal,
      });

      const data = await response.data;
      console.log(data);

      setSuggestions(
        data.map((place: IPlace) => ({
          label: place.formatted,
          lat: place.geometry.lat,
          lng: place.geometry.lng,
        })),
      );
      setIsFetching(false);
    } catch (error) {
      console.error("Ошибка при запросе данных", error);
    }
  };

  const handleSelect = (location: {
    label: string;
    lat: number;
    lng: number;
  }) => {
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: location.label,
          coordinates: [location.lat, location.lng],
        },
      },
    });
    setSuggestions([]);
    setActiveSearch(false);
  };

  return (
    <div className="">
      <Input
        type="text"
        ref={inputRef}
        value={loadingLocationName}
        onFocus={() => setActiveSearch(true)}
        onChange={(e) => {
          updateFormData({
            basicInfo: {
              ...formData.basicInfo,
              loadingLocation: {
                name: e.target.value,
                coordinates: formData.basicInfo.loadingLocation.coordinates,
              },
            },
          });
          setSuggestions([]);
        }}
        placeholder="Введите место..."
        className="border p-2 w-full"
      />
      {/* <div>Статуст activeSearch - {activeSearch ? "true" : "false"}</div> */}
      {/* <LoaderCircle /> */}

      {activeSearch ? (
        isFetching ? (
          <div className="flex items-center justify-center gap-4 border bg-white shadow-md rounded-md mt-1 py-4 text-muted-foreground">
            <LoaderCircle className="shrink-0 animate-spin h-4 w-4" />
            <p className="text-xs">Поиск результатов ...</p>
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="border bg-white shadow-md rounded-md mt-2">
            {suggestions.map((place, index) => (
              <div key={place.label + index}>
                <li
                  className="text-sm p-3 text-muted-foreground cursor-pointer hover:bg-muted"
                  onClick={() => handleSelect(place)}
                >
                  {place.label}
                </li>
                <div className="border-b" />
              </div>
            ))}
          </ul>
        ) : loadingLocationName.length > 2 ? (
          <div className="flex items-center justify-center gap-4 border bg-white shadow-md rounded-md mt-1 py-4 px-6 text-muted-foreground">
            <RefreshCwOff className="shrink-0 h-4 w-4" />
            <p className="text-xs">
              Нет результатов, попробуйте указать место сами прямо на карте,
              нажав на "Выбрать самому"
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 border bg-white shadow-md rounded-md mt-1 py-4 px-6 text-muted-foreground">
            {/* <RefreshCwOff className="shrink-0 h-4 w-4" /> */}
            <p className="text-xs">Введите больше символов</p>
          </div>
        )
      ) : null}
      {/* {suggestions.length > 0 && activeSearch && (
        <ul className="border bg-white shadow-md rounded-md mt-1">
          {suggestions.map((place, index) => (
            <div key={place.label + index}>
              <li
                className="p-2 cursor-pointer hover:bg-muted"
                onClick={() => handleSelect(place)}
              >
                {place.label}
              </li>
              <div className="border-b" />
            </div>
          ))}
        </ul>
      )} */}
    </div>
  );
}
