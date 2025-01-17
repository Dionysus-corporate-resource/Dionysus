import { BookingDetailContent } from "@/entities/booking-detail";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

export default function BookingDetailSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="outline"
          // size="sm"
        >
          Подробнее
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] max-w-[400px] sm:w-[540px] sm:max-w-[540px] lg:w-[520px] overflow-y-auto">
        {/* <SheetHeader>
          <SheetTitle>Детали заявки</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader> */}
        <BookingDetailContent />
      </SheetContent>
    </Sheet>
  );
}
