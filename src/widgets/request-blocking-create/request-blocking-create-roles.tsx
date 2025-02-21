import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { IUserDto } from "@/shared/model/types/user";
import { Coins } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

export default function RequsetBlockingCreate({
  user,
}: {
  user: IUserDto | undefined;
}) {
  const navigate = useNavigate();
  const purchasedBooking = user?.activeSubscriptions?.purchasedBooking;
  const unLimitBooking =
    user?.activeSubscriptions?.unLimitedBookingSubscription?.isPurchased;

  if ((purchasedBooking?.remainingBookings ?? 0) >= 1 || unLimitBooking)
    return null;

  if ((purchasedBooking?.remainingBookings ?? 0) <= 0) {
    return (
      <div className="relative h-wull">
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-[2px]">
          <div className="absolute inset-0 bg-background/80" />
          <Card className="relative mx-4 w-full max-w-lg space-y-6 py-12 px-12  text-center shadow-lg">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Недостаточно заявок
              </h2>
              <p className="text-muted-foreground">
                Для размещения заявки необходимо иметь минимум 1 заявку на
                балансе.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="secondary"
                className="w-full items-center"
                size="lg"
                onClick={() => navigate("/subscribe")}
              >
                Приобрести заявки
                <Coins className="w-4 h-4 ml-0" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">
                    или
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Получите бесплатные заявки, написав{" "}
                <NavLink
                  to="/"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  @fontMode
                </NavLink>{" "}
                в телеграмм, выполнив простые условия
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
