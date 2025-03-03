import { ChangeEvent, useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";

import { Checkbox } from "@/shared/components/ui/checkbox";
import MapSelector from "../components/map-selector";
import { Badge } from "@/shared/components/ui/badge";
// import LocationSelector from "../components/select-loading-location";
import { cn } from "@/shared/lib/utils";
import SearchLoadingLocation from "../components/search-loading-location";

// type FlattenedItem = {
//   name: string;
//   coordinates: [number, number];
//   type: "district" | "city" | "village";
// };

// type RegionWithLocation = {
//   region: string;
//   location: FlattenedItem[];
// };

// Функция для преобразования одного региона в нужный формат
// function flattenRegion(region: IRegion): RegionWithLocation {
//   const location: FlattenedItem[] = [];

//   // Проходим по районам
//   region.districts.forEach((district) => {
//     location.push({
//       name: district.name,
//       coordinates: district.coordinates,
//       type: "district",
//     });

//     // Добавляем деревни в районе
//     district.villages?.forEach((village) => {
//       location.push({
//         name: village.name,
//         coordinates: village.coordinates,
//         type: "village",
//       });
//     });

//     // Проходим по городам в районе
//     district.cities?.forEach((city) => {
//       location.push({
//         name: city.name,
//         coordinates: city.coordinates,
//         type: "city",
//       });

//       // Проходим по деревням в городе
//       city.villages?.forEach((village) => {
//         location.push({
//           name: village.name,
//           coordinates: village.coordinates,
//           type: "village",
//         });
//       });
//     });
//   });

//   // Если в регионе есть отдельные города
//   region.city?.forEach((city) => {
//     location.push({
//       name: city.name,
//       coordinates: city.coordinates,
//       type: "city",
//     });

//     city.villages?.forEach((village) => {
//       location.push({
//         name: village.name,
//         coordinates: village.coordinates,
//         type: "village",
//       });
//     });
//   });

//   return {
//     region: region.region,
//     location: location,
//   };
// }

// Функция для обработки массива регионов
// function flattenRegions(regions: IRegion[]): RegionWithLocation[] {
//   return regions.map(flattenRegion);
// }
export function BasicInfoStep({
  formData,
  updateFormData,
  isViewMap,
  setIsViewMap,
  // onNext,
}: FormStepProps) {
  // const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  console.log("coordinates", coordinates);
  // const [errors] = useState<Record<string, string>>({});

  // const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
  //   null,
  // );
  // console.log("selectedLocation", selectedLocation);

  const setCoordinatesHandle = (e: [number, number] | null) => {
    console.log("setCoordinatesHandle", e);
    setCoordinates(e);
    if (setIsViewMap) setIsViewMap(true);
    // updateFormData({
    //   basicInfo: {
    //     ...formData.basicInfo,
    //     loadingLocation: {
    //       name: formData.basicInfo.loadingLocation.name,
    //       coordinates: e,
    //     },
    //   },
    // });
    // сбрасываем значение, если он решил вводить его сам
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: "",
          coordinates: e,
        },
      },
    });
  };

  // const handleSelect = (value: ILocation) => {
  //   setSelectedLocation(value);
  //   setOpen(false);

  //   updateFormData({
  //     basicInfo: {
  //       ...formData.basicInfo,
  //       loadingLocation: {
  //         name: value?.name,
  //         coordinates: value?.coordinates,
  //       },
  //     },
  //   });
  // };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const filteredValue = value.replace(/\D/g, "");
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        [name]: filteredValue,
      },
    });
  };

  // const [search, setSearch] = useState("");
  // const filteredLocations = (
  //   addresses: RegionWithLocation,
  // ): RegionWithLocation["location"] => {
  //   if (!search) return addresses.location; // Если поиск пустой, возвращаем все адреса

  //   return addresses.location.filter((location) =>
  //     location.name.toLowerCase().includes(search.toLowerCase()),
  //   );
  // };

  return (
    <div
      className="grid rounded-lg
       xl:pt-6 grid-cols-1  xl:grid-cols-3 lg:gap-6 items-start space-y-6 xl:space-y-0"
    >
      {/* Карта */}
      <div className="h-full md col-span-2">
        <MapSelector
          formData={formData}
          setCoordinates={setCoordinatesHandle}
          // coordinates={coordinates}
        />
      </div>

      {/* Поля формы */}
      <div
        className="grid grid-cols-1 w-full h-fit gap-6
        ex:px-2"
      >
        {/* Место погрузки */}
        <div className="space-y-2">
          <Label
            htmlFor="loadingLocation"
            className="flex items-end justify-between"
          >
            <div
              className="space-x-2"
              // ex:text-xs"
            >
              <span>Место погрузки</span>
              {/* <Badge variant="secondary">Обязательное поле</Badge> */}
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="terms"
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
                ex:text-xs text-sm"
              >
                Выбрать самому
              </label>
              <Checkbox
                checked={isViewMap}
                onCheckedChange={(checked) => {
                  // сбрасываем значение, если он решил вводить его сам
                  if (checked) {
                    updateFormData({
                      basicInfo: {
                        ...formData.basicInfo,
                        loadingLocation: {
                          name: "",
                          coordinates: null,
                        },
                      },
                    });
                  } else {
                    updateFormData({
                      basicInfo: {
                        ...formData.basicInfo,
                        loadingLocation: {
                          name: "Майкопский Район",
                          coordinates: [44.6078, 40.1058],
                        },
                      },
                    });
                  }
                  if (setIsViewMap) {
                    // проверяем что setIsViewMap существует
                    setIsViewMap(Boolean(checked));
                  }
                }}
              />
            </div>
          </Label>

          {!isViewMap ? (
            // <LocationSelector
            //   updateFormData={updateFormData}
            //   formData={formData}
            // />
            <SearchLoadingLocation
              updateFormData={updateFormData}
              formData={formData}
            />
          ) : (
            <>
              <Input
                placeholder="Введите место погрузки"
                value={formData?.basicInfo?.loadingLocation?.name}
                onChange={(e) =>
                  updateFormData({
                    basicInfo: {
                      ...formData.basicInfo,
                      loadingLocation: {
                        name: e.target.value,
                        coordinates:
                          formData.basicInfo.loadingLocation?.coordinates,
                      },
                    },
                  })
                }
              />
              {!formData?.basicInfo?.loadingLocation?.coordinates && (
                <p
                  className="mt-1 text-sm text-red-500
                  ex:text-xs"
                >
                  Пожалуйста, выберите точку на карте.
                </p>
              )}
              {!formData?.basicInfo?.loadingLocation?.name && (
                <p
                  className="mt-1 text-sm text-red-500
                  ex:text-xs"
                >
                  Пожалуйста, введите место погрузки.
                </p>
              )}
            </>
          )}
        </div>

        {/* Расстояние */}
        <div className="space-y-2">
          <Label
            htmlFor="distance"
            className="flex items-end justify-between"
            // ex:text-xs"
          >
            Расстояние (км)
            <Badge
              variant="secondary"
              className={cn(
                "hidden",
                !formData?.basicInfo?.distance &&
                  "block text-red-400 bg-red-50",
              )}
              // ex:text-xs"
            >
              Обязательное поле
            </Badge>
          </Label>

          <Input
            id="distance"
            name="distance"
            placeholder="Укажите расстояние"
            value={formData.basicInfo?.distance}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="tonnage"
            className="flex items-end justify-between
            ex:text-xs"
          >
            Тоннаж (тонн)
            {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
              Желательное поле
            </Badge> */}
          </Label>
          <Input
            id="tonnage"
            name="tonnage"
            placeholder="Укажите тоннаж"
            value={formData.basicInfo?.tonnage}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="unLoadingLocation"
            className="flex items-end justify-between"
            // ex:text-xs"
          >
            Место выгрузки{" "}
            <Badge
              variant="secondary"
              className={cn(
                "hidden",
                !formData?.basicInfo?.unLoadingLocation &&
                  "block text-red-400 bg-red-50",
              )}
              // ex:text-xs"
            >
              Обязательное поле
            </Badge>
          </Label>
          <Input
            id="unLoadingLocation"
            placeholder="Укажите место выгрузки"
            value={formData.basicInfo?.unLoadingLocation || ""}
            onChange={(e) =>
              updateFormData({
                basicInfo: {
                  ...formData.basicInfo,
                  unLoadingLocation: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="culture" className="flex items-end justify-between">
            Культура{" "}
            <Badge
              variant="secondary"
              className={cn(
                "hidden",
                !formData?.basicInfo?.culture && "block text-red-400 bg-red-50",
              )}
            >
              Обязательное поле
            </Badge>
          </Label>
          <Input
            id="culture"
            placeholder="Укажите культуру"
            value={formData.basicInfo?.culture}
            onChange={(e) =>
              updateFormData({
                basicInfo: { ...formData.basicInfo, culture: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

// const handleNext = () => {
//   const newErrors: Record<string, string> = {};
//   if (!formData.basicInfo?.firstName) {
//     newErrors.firstName = "First name is required";
//   }
//   if (!formData.basicInfo?.lastName) {
//     newErrors.lastName = "Last name is required";
//   }
//   if (!formData.basicInfo?.email) {
//     newErrors.email = "Email is required";
//   }

//   if (Object.keys(newErrors).length === 0) {
//     onNext();
//   } else {
//     setErrors(newErrors);
//   }
// };

// <Popover open={open} onOpenChange={setOpen}>
//   <PopoverTrigger asChild>
//     <Button
//       variant="outline"
//       role="combobox"
//       aria-expanded={open}
//       className="w-full justify-between"
//       // ex:text-xs"
//     >
//       Выбрано: {formData?.basicInfo?.loadingLocation?.name}
//       {/* {selectedLocation?.name} */}
//       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//     </Button>
//   </PopoverTrigger>
//   <PopoverContent className="w-full p-0" align="start">
//     <Command className="z-[9999]">
//       <CommandInput
//         placeholder="Type a command or search..."
//         className="z-[9999]"
//         onValueChange={setSearch}
//       />
//       <CommandList className="z-[9999]">
//         <CommandEmpty>Нет результатов</CommandEmpty>
//         {cityesLocations.map((region) => {
//           const filtered = filteredLocations(flattenRegion(region));
//           if (filtered.length === 0) return null;

//           return (
//             <>
//               <CommandGroup
//                 key={region.region}
//                 heading={region.region}
//               >
//                 {filtered.map((location) => (
//                   <CommandItem
//                     key={location.name}
//                     onSelect={() => handleSelect(location)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         formData?.basicInfo?.loadingLocation
//                           ?.name === location.name
//                           ? "opacity-100"
//                           : "opacity-0",
//                       )}
//                     />
//                     {location.name}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//               <CommandSeparator />
//             </>
//           );
//         })}
//       </CommandList>
//     </Command>
//   </PopoverContent>
// </Popover>
