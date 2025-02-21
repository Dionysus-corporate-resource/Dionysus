import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function SkeletonBookingCard() {
  return (
    <Card className="w-full max-w-lg border bg-card">
      {/* Заголовок с номером заявки и статусом */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-32" /> {/* Номер заявки */}
            <Skeleton className="h-4 w-24" /> {/* Дата */}
          </div>
          <Skeleton className="h-6 w-20" /> {/* Статус */}
        </div>

        {/* Быстрая информация */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <Skeleton className="h-3 w-32 mx-auto mb-2" />
            <Skeleton className="h-5 w-12 mx-auto" />
          </div>
          <div className="text-center border-x border-border">
            <Skeleton className="h-3 w-16 mx-auto mb-2" />
            <Skeleton className="h-5 w-14 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-3 w-16 mx-auto mb-2" />
            <Skeleton className="h-5 w-12 mx-auto" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6">
        {/* Маршрут */}
        <div className="relative grid grid-cols-[1fr_1fr] gap-4 py-2">
          <div className="relative">
            <Skeleton className="absolute w-3 h-3 rounded-full top-[5px] left-0" />
            <div className="pl-6">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-20 mb-1" />
            </div>
          </div>

          <div className="relative">
            <Skeleton className="absolute w-3 h-3 rounded-full top-[5px] left-0" />
            <div className="pl-6">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-20 mb-1" />
            </div>
          </div>
        </div>

        {/* Детали груза */}
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <div>
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <div>
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          {/* <div className="h-[1px] bg-border" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-6 w-28 rounded-md" />
            </div>
          </div> */}
        </div>

        {/* Действия */}
        <div className="grid grid-cols-1 gap-3">
          <Skeleton className="h-10 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
