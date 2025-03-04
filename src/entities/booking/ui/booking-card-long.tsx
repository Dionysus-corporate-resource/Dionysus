import { ArrowDownRight, CornerRightUp } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ReactNode } from "react";
import { IBookingDto } from "@/shared/model/types/booking";

export default function BookingCardLong({
  bookingDetailSlot,
  booking,
}: {
  bookingDetailSlot?: ReactNode;
  orderNumber?: number;
  booking: IBookingDto;
}) {
  return (
    <Card className="relative flex flex-col  h-full bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Left section with ID and culture */}
      <div className="p-2 w-full flex items-center justify-between border-b">
        <div className="flex items-center ">
          <Badge variant="outline" className="w-full border-none px-2 py-1">
            {/* <Package className="w-4 h-4 shrink-0" /> */}
            <div className="flex gap-2 text-xs font-medium ">
              <p>-</p>
              {booking?.basicInfo?.culture || "Уточнить"}
            </div>
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground mr-2">
          {new Date(booking.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
          })}{" "}
          {new Date(booking?.createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        {/* <div className="text-xs text-muted-foreground">
          ID: {booking?._id.slice(Math.floor(booking._id.length / 2))}
        </div> */}
      </div>

      <div className="flex flex-col flex-1 px-0 py-0">
        {/* Middle section with route info */}
        {/* <div className="shrink-0 w-full border-dashed border-r border-border p-0 flex flex-col justify-between">
          <div className="grid grid-cols-3 justify-center gap-2 bg-muted/30 p-4">
            <div className="text-center border-r">
              <p className="text-sm font-medium">
                {booking?.basicInfo?.distance ? (
                  <>{booking?.basicInfo?.distance} км</>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Расстояние</p>
            </div>
            <div className="text-center border-r">
              <p className="text-sm font-medium">
                {booking?.basicInfo?.tonnage ? (
                  <>{booking?.basicInfo?.tonnage} тонн</>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Вес</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {booking?.detailTransportation?.ratePerTon ? (
                  <>{booking?.detailTransportation?.ratePerTon} ₽/т</>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Ставка</p>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-">
          <div className="text-center px-2 2xl:px-6">
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
          <div className="text-center border-x border-border ">
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
          <div className="text-center ">
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

        {/* Right section with stats */}
        <div className="flex-1 ex:p-4 p-6">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-2">
              <ArrowDownRight className="shrink-0  w-4 h-4 mt-[2px]" />
              <div>
                <p className="text-sm font-medium">
                  {booking?.basicInfo?.loadingLocation?.name || "-"}
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

            <div className="flex gap-2">
              <CornerRightUp className="shrink-0  w-4 h-4 mt-[2px]" />
              <div>
                <p className="text-sm font-medium">
                  {booking?.basicInfo?.unLoadingLocation || "-"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Место выгрузки
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-fit w-wull p-4 pt-2 flex items-center justify-end">
        {/* <p className="px-2">{booking?.companyPublicData?.nameCompany}</p> */}
        {bookingDetailSlot}
      </div>
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
