import { ArrowDownRight, CornerRightUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ReactNode } from "react";
import { IBookingDto } from "@/shared/model/types/booking";

export default function BookingCard({
  bookingDetailSlot,
  // orderNumber,
  booking,
}: {
  bookingDetailSlot?: ReactNode;
  orderNumber: number;
  booking: IBookingDto;
}) {
  return (
    <Card
      className="w-full max-w-xl bg-card flex flex-col gap-2 justify-between
      shadow-md hover:shadow-lg transition-shadow duration-200
      "
    >
      {/* Заголовок с номером заявки и статусом */}
      <CardHeader className="pb-4 ex:p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col items-start gap-2">
            {/* <Badge variant="default" className="bg-muted-foreground text-white">
              {booking?.basicInfo?.culture ? (
                <>{booking?.basicInfo?.culture}</>
              ) : (
                "Уточнить"
              )}
            </Badge> */}
            <Badge variant="default" className="bg-primary/80 space-x-2">
              <Package className="w-4 h-4" />
              <p className="max-w-32">
                {booking?.basicInfo?.culture
                  ? booking?.basicInfo?.culture
                  : "Уточнить"}
              </p>
            </Badge>
            <span className="text-xs text-muted-foreground">
              ID: {booking?._id.slice(Math.floor(booking._id.length / 2))}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center text-sm text-muted-foreground
                ex:text-xs"
              >
                {/* <Calendar className="w-4 h-4 mr-1" /> */}
                {new Date(booking.createdAt).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                })}
              </div>
              <div
                className="flex items-center text-sm text-muted-foreground
                ex:text-sm"
              >
                {/* <Clock className="w-4 h-4 mr-1" /> */}
                {new Date(booking?.createdAt).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            {/* <span className="text-xs text-muted-foreground">
              ID: {booking?._id.slice(Math.floor(booking._id.length / 2))}
            </span> */}
          </div>
        </div>

        {/* Быстрая информация */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Расстояние</p>
            <p
              className="font-medium
              ex:text-xs"
            >
              {booking?.basicInfo?.distance ? (
                <>{booking?.basicInfo?.distance} км</>
              ) : (
                "-"
              )}
            </p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xs text-muted-foreground mb-1">Вес</p>
            <p
              className="font-medium
              ex:text-xs"
            >
              {booking?.basicInfo?.tonnage ? (
                <>{booking?.basicInfo?.tonnage} тонн</>
              ) : (
                "-"
              )}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Ставка</p>
            <p
              className="font-medium
              ex:text-xs"
            >
              {booking?.detailTransportation?.ratePerTon ? (
                <>{booking?.detailTransportation?.ratePerTon} ₽/т</>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 justify-between">
        {/* Маршрут */}
        <div
          className="relative grid grid-cols-1 gap-4 py-2
          ex:grid-cols-1"
        >
          <div className="relative flex gap-2">
            <ArrowDownRight className="w-4 h-4 mt-[2px] shrink-0" />

            <div className="">
              <p className="text-sm font-medium">
                {booking?.basicInfo?.loadingLocation?.name
                  ? booking?.basicInfo?.loadingLocation?.name
                  : "-"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Место погрузки
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {booking?.conditionsTransportation?.loadingDate
                  ? new Date(
                      booking?.conditionsTransportation?.loadingDate,
                    ).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                    })
                  : "Уточнить"}
              </p>
            </div>
          </div>

          <div className="relative flex gap-2">
            {/* <div className="absolute w-3 h-3 rounded-full bg-muted-foreground/30 top-[5px] left-0" /> */}
            <CornerRightUp className="w-4 h-4 mt-[2px] shrink-0" />
            <div className="">
              <p className="text-sm font-medium">
                {booking?.basicInfo?.unLoadingLocation
                  ? booking?.basicInfo?.unLoadingLocation
                  : "-"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Место выгрузки
              </p>
              {/* <p className="text-xs text-muted-foreground mt-1">!</p> */}
            </div>
          </div>
        </div>

        {/* Действия */}

        <div className="grid grid-cols-1 gap-3">
          <div className="col-start-2 flex justify-end">
            {bookingDetailSlot}
          </div>
        </div>
        {/* <Button
          // variant="outline"
          className="bg-[hsl(var(--access-primary))] text-white "
        >
          Подробнее
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button> */}
      </CardContent>
    </Card>
  );
}

{
  /* Детали груза */
}
// <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
//   <div className="grid grid-cols-2 gap-4">
//     <div className="flex items-center gap-2">
//       <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
//         <Package className="w-4 h-4 text-primary" />
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground">Груз</p>
//         <p className="font-medium">
//           {booking?.basicInfo?.culture
//             ? booking?.basicInfo?.culture
//             : "-"}
//         </p>
//       </div>
//     </div>

//     <div className="flex items-center gap-2">
//       <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
//         <Truck className="w-4 h-4 text-primary" />
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground">Тип ТС</p>
//         <p className="font-medium">Тент</p>
//       </div>
//     </div>

//     <div className="flex items-center gap-2">
//       <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
//         <Wallet className="w-4 h-4 text-primary" />
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground">Тип Оплаты</p>
//         <p className="font-medium">
//           {booking?.detailTransportation?.paymentType
//             ? getPaymentMethodLabel(
//                 booking?.detailTransportation?.paymentType,
//               )
//             : "-"}
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
