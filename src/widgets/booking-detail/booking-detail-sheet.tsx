import BookingDetailContent from "@/entities/booking/ui/booking-detail-content";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ReactNode } from "react";

export default function BookingDetailSheet({
  bookingId,
  actionSlot,
}: {
  bookingId: string;
  actionSlot: ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger>{actionSlot}</SheetTrigger>
      <SheetContent className="w-[400px] max-w-[400px] sm:w-[540px] sm:max-w-[540px] lg:w-[520px] overflow-y-auto z-[999]">
        <SheetHeader className="flex flex-row items-center gap-2">
          {/* <PackageOpen className="w-4 h-4 text-muted-foreground" /> */}
          <SheetTitle>Детали заявки</SheetTitle>
        </SheetHeader>
        <BookingDetailContent bookingId={bookingId} />
      </SheetContent>
    </Sheet>
  );
}
