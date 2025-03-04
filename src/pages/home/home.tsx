import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router";
import SortBookingPanel from "@/feature/filter-panel/sort-booking-panel";
import { bookingQueryOption } from "./api/query-option";
import { useQuery } from "@tanstack/react-query";
import FilterBookingPanel from "@/feature/filter-panel/filter-booking-panel";

import { ArrowUpDown, Filter, Package2, X } from "lucide-react";
import { MobileFilterPanel } from "@/widgets/mobile/mobile-filter-panel/mobile-filter-panel";
import { MobileSortedPanel } from "@/widgets/mobile/mobile-sorted-panel/mobile-sorted-panel";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Toggle } from "@/shared/components/ui/toggle";
import PageLoader from "@/shared/ui/page-loader";
import { SiteFooter } from "@/shared/ui/footer";
// import MapBackground from "@/widgets/map/map-background";
import MapBackgroundYandex from "@/widgets/map/map-background-yandex";
// карта Яндекс

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
    <div className="container mx-auto grid grid-cols-3 gap-0">
      {/* карта */}
      <div className="col-span-3  rounded-lg overflow-hidden">
        <div className="absolute left-0 col-span-3  h-[414px] w-full rounded-lg overflow-hidden">
          <MapBackgroundYandex />
        </div>
      </div>

      {/* сортировочная панель */}
      <div className="col-span-3 md:col-span-3 lg:col-span-1 flex flex-col pb-0 lg:pb-8">
        <div className="sticky top-24 z-10 mt-[374px] rounded-xl">
          <Tabs defaultValue={location.pathname}>
            <div className="relative flex gap-2 xl:gap-6 ex:gap-2 justify-between ex:flex-col flex-col xl:flex-row">
              <div className="flex gap-6">
                <TabsList className="h-10 rounded-b-none">
                  {/* <TabsTrigger
                    value="/table-view"
                    className="space-x-2"
                    onClick={() => navigate("/table-view")}
                  >
                    <List className="w-4 h-4" />
                    <span className="">Таблица</span>
                  </TabsTrigger> */}
                  <TabsTrigger
                    disabled
                    value="/map-view"
                    className="space-x-2"
                    onClick={() => navigate("/map-view")}
                  >
                    {/* <Truck className="w-4 h-4" /> */}
                    <span className="ex:text-xs">Первзчиков (скоро)</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="/"
                    className="space-x-2"
                    onClick={() => navigate("/")}
                  >
                    <Package2 className="w-4 h-4" />
                    <span className="ex:text-xs">Поиск грузов</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex items-center gap-4 ex:gap-2 ex:bg-background lg:hidden px-2 rounded-t-lg">
                <div className="lg:hidden">
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
                    className="ex:hidden lg:hidden"
                    pressed={isOpenMobileFilter}
                    aria-label="Toggle italic"
                    onClick={() => setIsOpenMobileFilter((prev) => !prev)}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="ex:hidden">фильтрация</span>
                  </Toggle>
                </div>
                <div className="lg:hidden">
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
                    className="ex:hidden lg:hidden"
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
          <div className="bg-background rounded-r-lg">
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
        </div>
      </div>

      <div className="relative col-span-3 md:col-span-3 lg:col-span-2 z-10 ex:px-0 px-4 pt-6 lg:pt-0 lg:mt-[380px] rounded-xl pb-8">
        <Outlet />
      </div>

      {/* реклама */}
      {/* <div className="col-span-3">
        <FeaturePromo />
      </div> */}

      {/* подвал */}
      <div className="h-60 col-span-3 mt-0">
        <div className="absolute left-0 bottom-0 w-full h-60 col-span-3 bg-muted">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
