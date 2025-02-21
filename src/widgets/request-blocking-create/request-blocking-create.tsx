import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { IUserDto } from "@/shared/model/types/user";
import { UserCog } from "lucide-react";
import { useNavigate } from "react-router";

export default function RequsetBlockingCreateRoles({
  user,
}: {
  user: IUserDto | undefined;
}) {
  const navigate = useNavigate();
  const isShow = user?.roles === "customer";

  if (!isShow) {
    return (
      <div className="relative h-wull">
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] px-2">
          <div className="absolute inset-0 bg-background/80" />
          <Card className="relative mx-4 w-full max-w-xl space-y-8 py-12 px-12 ex:px-4 text-center shadow-lg">
            <div className="space-y-4">
              <h2 className="text-2xl ex:text-lg font-semibold tracking-tight">
                Перевозчики не могу выкладывать заявки (
              </h2>
              <p className="text-muted-foreground ex:text-sm">
                Если вы хотите создават заявку, вам нужно зайти в личный кабинет
                и поменять роль с "Водитель" на "Заказчик перевозки"
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="secondary"
                className="w-full items-center ex:text-xs"
                size="lg"
                onClick={() => navigate("/profile")}
              >
                Перейти в личный кабинет
                <UserCog className="w-4 h-4 ml-0" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
