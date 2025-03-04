import { SkeletonBookingCard } from "@/entities/booking";
import { Button } from "@/shared/components/ui/button";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { useAtomValue } from "jotai";
import { ArrowUpRight } from "lucide-react";
import { sortbookingAtom } from "../model/sort-atom";
import BookingCardLong from "@/entities/booking/ui/booking-card-long";

export default function BookingListCard() {
  const sortBooking = useAtomValue(sortbookingAtom);

  // Фильтруем заявки по статусу "active" ДЛЯ КАРТЫ ЧИСТО
  const filterBooking = sortBooking?.filter(
    (booking) => booking?.status === "active",
  );

  return (
    <div className="mx-auto w-full grid gap-2 ex:px-2 ex:mt-2 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
      {!filterBooking ? (
        Array.from({ length: 10 }).map((_, index) => (
          <SkeletonBookingCard key={index} />
        ))
      ) : filterBooking.length > 0 ? (
        filterBooking?.reverse().map((booking, index) => (
          <BookingCardLong
            key={booking._id}
            orderNumber={index + 1}
            booking={booking}
            bookingDetailSlot={
              <BookingDetailSheet
                bookingId={booking?._id}
                actionSlot={
                  <Button
                    variant="secondary"
                    // size="sm"
                    className="w-full"
                    // style={{ borderRadius: "0px 0px 6px 0px" }}
                  >
                    <p className="ex: mr-2">Подробнее</p>
                    <ArrowUpRight className="text-primary/80 w-4 h-4" />
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
