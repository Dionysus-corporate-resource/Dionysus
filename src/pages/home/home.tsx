import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router";
import SortBookingPanel from "@/feature/filter-panel/sort-booking-panel";
import { bookingQueryOption } from "./api/query-option";
import { useQuery } from "@tanstack/react-query";
import FilterBookingPanel from "@/feature/filter-panel/filter-booking-panel";

import {
  ArrowUpDown,
  Filter,
  List,
  Map,
  PanelRightDashed,
  X,
} from "lucide-react";
import { MobileFilterPanel } from "@/widgets/mobile/mobile-filter-panel/mobile-filter-panel";
import { MobileSortedPanel } from "@/widgets/mobile/mobile-sorted-panel/mobile-sorted-panel";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Toggle } from "@/shared/components/ui/toggle";
import PageLoader from "@/shared/ui/page-loader";

export default function HomePage() {
  const { data, isPending } = useQuery(bookingQueryOption.getAll());
  const filterBooking = data?.filter((booking) => booking?.status === "active");
  // const [isMapViewFull, setIsMapViewFull] = useAtom(isMapViewFullAtom);
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(false);
  const [isOpenMobileSorted, setIsOpenMobileSorted] = useState(false);
  const [isOpenFilterAndSorted] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  if (isPending)
    return (
      <div className="w-full h-[calc(100vh-80px)]">
        <PageLoader />
      </div>
    );

  return (
    <div className="w-full mx-auto h-full grid grid-cols-1 xl:grid-cols-4 xl:gap-0 2xl:gap-0">
      <div className="flex flex-col gap-2 p-1 pb-0 sm:pb-2 md:pb-3 ex:pr-1 sm:p-2 md:p-4">
        <Tabs defaultValue={location.pathname}>
          <div className="relative flex gap-6 justify-between flex-row xl:flex-row">
            <div className="flex gap-6">
              <TabsList>
                <TabsTrigger
                  value="/table-view"
                  className="space-x-2
                    hidden 2xl:flex"
                  onClick={() => navigate("/table-view")}
                >
                  <List className="w-4 h-4" />
                  <span className="">Таблица</span>
                </TabsTrigger>
                <TabsTrigger
                  value="/map-view"
                  className="space-x-2"
                  onClick={() => navigate("/map-view")}
                >
                  <Map className="w-4 h-4" />
                  <span className="ex:text-xs">Карта</span>
                </TabsTrigger>

                <TabsTrigger
                  value="/"
                  className="space-x-2"
                  onClick={() => navigate("/")}
                >
                  <PanelRightDashed className="w-4 h-4" />

                  <span className="ex:text-xs">Карточки</span>
                </TabsTrigger>
              </TabsList>
            </div>
            <div
              className="flex items-center gap-4
                ex:gap-2"
            >
              {/* Кнопка открытия панели сортировки */}
              <div className="xl:hidden">
                <button
                  onClick={() => setIsOpenMobileSorted((prev) => !prev)}
                  className={cn(
                    "bg-muted p-1 focus:outline-none flex justify-start items-center rounded-md",
                    isOpenMobileSorted && "border bg-red-50 border-red-50",
                    "sm:hidden",
                  )}
                >
                  {isOpenMobileSorted ? (
                    <X className="text-red-400 w-4 h-4 m-0.5" />
                  ) : (
                    <ArrowUpDown className="w-4 h-4 m-[3px]" />
                  )}
                </button>

                <Toggle
                  className="ex:hidden xl:hidden"
                  pressed={isOpenMobileFilter}
                  aria-label="Toggle italic"
                  onClick={() => setIsOpenMobileFilter((prev) => !prev)}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="ex:hidden">фильтрация</span>
                </Toggle>
              </div>
              {/* Кнопка открытия панели фильтрации */}
              <div className="xl:hidden">
                <button
                  onClick={() => setIsOpenMobileFilter((prev) => !prev)}
                  className={cn(
                    "bg-muted p-1 focus:outline-none flex justify-start items-center rounded-md",
                    isOpenMobileFilter && "border bg-red-50 border-red-50",
                    "sm:hidden",
                  )}
                >
                  {isOpenMobileFilter ? (
                    <X className="text-red-400 w-4 h-4 m-0.5" />
                  ) : (
                    <Filter className="w-4 h-4 m-[3px]" />
                  )}
                </button>

                <Toggle
                  className="ex:hidden xl:hidden"
                  aria-label="Toggle italic"
                  pressed={isOpenMobileSorted}
                  onClick={() => setIsOpenMobileSorted((prev) => !prev)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="ex:hidden">сортировка</span>
                </Toggle>
              </div>
            </div>
          </div>
        </Tabs>

        {isOpenFilterAndSorted && (
          <FilterBookingPanel
            placeUse="desktop"
            filterBooking={filterBooking}
            sortedPanelSlot={<SortBookingPanel placeUse="desktop" />}
          />
        )}
        {isOpenMobileSorted && (
          <MobileSortedPanel
            sortPanelSlot={<SortBookingPanel placeUse="mobile" />}
          />
        )}
        {isOpenMobileFilter && (
          <MobileFilterPanel
            filterPanelSlot={
              <FilterBookingPanel
                placeUse="mobile"
                filterBooking={filterBooking}
                sortedPanelSlot={<SortBookingPanel placeUse="desktop" />}
              />
            }
          />
        )}
      </div>
      <div className="col-span-3 h-[calc(100vh-508px)] xl:h-[calc(100vh-70px)] xl:overflow-y-auto xl:pr-2">
        <Outlet />
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
