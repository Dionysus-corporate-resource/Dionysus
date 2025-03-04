import {
  filterbookingAtom,
  sortbookingAtom,
} from "@/pages/home/model/sort-atom";
import { Label } from "@/shared/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  BadgeRussianRuble,
  Cuboid,
  Waypoints,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
// import { format } from "date-fns";

type ISortField = "distance" | "tonnage" | "ratePerTon";

export default function SortBookingPanel({
  placeUse,
}: {
  placeUse: "mobile" | "desktop";
}) {
  const [sortField, setSortField] = useState<ISortField | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // мы передали сверху чистый массив заявок, передали в панель сортировки
  // и когда зде будут меняться параметры, будем сортировать это изначально чистый массив
  const filterBooking = useAtomValue(filterbookingAtom);
  const setSortBooking = useSetAtom(sortbookingAtom);

  // Обработчик выбора поля сортировки
  const handleSortFieldChange = (field: ISortField) => {
    if (sortField === field) {
      // setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      console.log(sortField);
    } else {
      setSortField(field);
      // setSortDirection("asc");
    }
  };

  // Обработчик выбора даты
  // const handleDateSelect = (date: Date | undefined) => {
  //   setSelectedDate(date);
  //   if (date) {
  //     setSortField("loadingDate");
  //     setSortDirection("desc");
  //   }
  // };

  // Эффект для сортировки и обновления атома
  useEffect(() => {
    if (!filterBooking) return;

    const sortedBookings = [...filterBooking].sort((a, b) => {
      if (!sortField) return 0;

      let valueA: string | number | null;
      let valueB: string | number | null;

      // Обрабатываем вложенные поля
      switch (sortField) {
        case "distance":
          valueA = parseFloat(a.basicInfo?.distance);
          valueB = parseFloat(b.basicInfo?.distance);
          break;

        case "tonnage":
          valueA = a?.basicInfo?.tonnage;
          valueB = b?.basicInfo?.tonnage;
          break;

        case "ratePerTon":
          valueA = parseFloat(a?.detailTransportation?.ratePerTon);
          valueB = parseFloat(b?.detailTransportation?.ratePerTon);
          break;

        default:
          return 0;
      }

      // Сравниваем значения
      if ((valueA ?? 0) < (valueB ?? 0))
        return sortDirection === "asc" ? -1 : 1;
      if ((valueA ?? 0) > (valueB ?? 0))
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setSortBooking(sortedBookings);
  }, [filterBooking, sortField, sortDirection, setSortBooking]);

  return (
    <div
      className={cn(
        "",
        placeUse === "mobile"
          ? "flex flex-row ex:flex-col ex:gap-2 ex:pb-2 gap-4 ex:px-4 sm:px-0"
          : "hidden xl:grid grid-cols-1 2xl:grid-cols-2 items-end gap-4",
      )}
    >
      {/* Выбор поля сортировки */}
      <div className="w-full space-y-1">
        <Label>Свойство сортировки</Label>

        <Select
          value={sortField || "none"}
          onValueChange={(e) => handleSortFieldChange(e as ISortField)}
        >
          <SelectTrigger className="h-8 md:h-8 lg:h-10 xl:h-12 pl-4 w-full bg-muted border-none">
            <SelectValue placeholder="Поля сортировки" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Поля сотировки</SelectLabel>
              <SelectItem value="none">
                <div className="flex gap-4 items-center">
                  <X className="w-4 h-4 text-muted-foreground" />
                  Не выбрано
                </div>
              </SelectItem>
              <SelectItem value="distance">
                <div className="flex gap-4 items-center">
                  <Waypoints className="w-4 h-4 text-muted-foreground" />
                  Расстояние
                </div>
              </SelectItem>
              <SelectItem value="ratePerTon">
                <div className="flex gap-4 items-center">
                  <BadgeRussianRuble className="w-4 h-4 text-muted-foreground" />
                  Ценна
                </div>
              </SelectItem>
              <SelectItem value="tonnage">
                <div className="flex gap-4 items-center">
                  <Cuboid className="w-4 h-4 text-muted-foreground" />
                  Тоннаж
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Тип сортировки */}
      <div className="w-full space-y-1">
        <Label>Тип сортировки</Label>

        <Select
          value={sortDirection || "asc"}
          onValueChange={(e) => setSortDirection(e as "asc" | "desc")}
        >
          <SelectTrigger className="h-8 md:h-8 lg:h-10 xl:h-12 pl-4 w-full bg-muted border-none">
            <SelectValue placeholder="Тип сортировки" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Тип сортировки</SelectLabel>
              <SelectItem value="asc">
                <div className="flex gap-4 items-center">
                  <ArrowUpWideNarrow className="w-4 h-4 text-muted-foreground" />
                  По возрастания
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex gap-4 items-center">
                  <ArrowDownWideNarrow className="w-4 h-4 text-muted-foreground" />
                  По убыванию
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Календарь для выбора даты */}
      {/* <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Выберите дату погрузки</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div> */}
    </div>
  );
}
