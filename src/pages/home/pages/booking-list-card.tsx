import { BookingCard, SkeletonBookingCard } from "@/entities/booking";
import { Button } from "@/shared/components/ui/button";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { useAtomValue } from "jotai";
import { ArrowUpRight } from "lucide-react";
import { sortbookingAtom } from "../model/sort-atom";

export default function BookingListCard() {
  const sortBooking = useAtomValue(sortbookingAtom);

  // Фильтруем заявки по статусу "active" ДЛЯ КАРТЫ ЧИСТО
  const filterBooking = sortBooking?.filter(
    (booking) => booking?.status === "active",
  );

  return (
    <div
      className="mx-auto w-fit grid gap-4 ex:px-2 ex:mt-2 p- bg- rounded-xl
     grid-cols-1 md:grid-cols-2 md:w-full lg:grid-cols-1 xl:grid-cols-2 lg:w-full 2xl:grid-cols-2 2xl:w-full"
    >
      {!filterBooking ? (
        Array.from({ length: 10 }).map((_, index) => (
          <SkeletonBookingCard key={index} />
        ))
      ) : filterBooking.length > 0 ? (
        filterBooking?.reverse().map((booking, index) => (
          <BookingCard
            key={booking._id}
            orderNumber={index + 1}
            booking={booking}
            bookingDetailSlot={
              <BookingDetailSheet
                bookingId={booking?._id}
                actionSlot={
                  <Button
                    variant="secondary"
                    // className="bg-[hsl(var(--access-primary))] text-white "
                  >
                    Подробнее
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                }
              />
            }
          />
        ))
      ) : (
        <div className="text-muted-foreground mt-24">Нет активных заявок</div>
      )}
    </div>
  );
}
