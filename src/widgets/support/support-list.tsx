import { Dispatch, SetStateAction, useState } from "react";
import { Blocks, MessageCirclePlus, ServerCrash } from "lucide-react";

import { CardDescription, CardTitle } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { proposalsApi } from "@/feature/proposals/api/proposals-api";
import { IProposalsDto } from "@/shared/model/types/proposals";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { SkeletonProposals } from "@/entities/proposals";

export default function FeedbackList({
  setIsOpenFeedBackForm,
}: {
  setIsOpenFeedBackForm?: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: proposals, isPending } = useQuery({
    queryKey: ["proposals"],
    queryFn: () => proposalsApi.getAll(),
  });
  const [filter, setFilter] = useState<string>("all");

  const filteredFeedback = proposals?.filter((item) =>
    filter === "all" ? true : item.topic === filter,
  );

  return (
    <div className="h-[calc(100vh-80px)] p-6 ex:p-4 pr-4 col-span-2">
      <div className="flex flex-row ex:flex-col justify-between gap-4 ex:gap-2 mb-4">
        <div>
          <Button
            className="bg-primary/80 lg:hidden"
            onClick={() => setIsOpenFeedBackForm && setIsOpenFeedBackForm(true)}
          >
            <MessageCirclePlus className="h-4 w-4" />
            Оставить предложение
          </Button>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Отображать все типы</SelectItem>
              <SelectItem value="proposals">
                Предложения по разработке
              </SelectItem>
              <SelectItem value="bag">Ошибки на сайте</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 2xl:grid-cols-2 max-h-[calc(100%-30px)] pr-2 ex:pb-4 overflow-y-auto">
        {isPending ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonProposals key={index} />
          ))
        ) : filteredFeedback ? (
          filteredFeedback?.map((item) => (
            <div key={item._id} className="bg-muted p-4 ex:p-2 rounded-lg">
              <div className="flex flex-row ex:flex-col gap-2 justify-between items-start">
                <div className="flex items-start gap-2">
                  {item.topic === "bag" ? (
                    <ServerCrash className="h-6 w-6 m-3 ex:m-2 shrink-0" />
                  ) : (
                    <Blocks className="h-6 w-6 m-3 ex:m-2 shrink-0" />
                  )}
                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-medium text-lg ex:text-sm">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/60 ex:text-xs">
                      {item.topic === "bag"
                        ? "Ошибка на сайте"
                        : "Предложения по разработке"}
                    </CardDescription>
                  </div>
                </div>
                {/* <StatusBadge status={item.status} /> */}
              </div>

              <p
                className={cn(
                  "font-normal text-muted-foreground ex:text-sm ex:p-1",
                  item.description.length !== 0 && "mt-4",
                )}
              >
                {item.description}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-muted rounded-lg flex justify-center items-center py-12 col-span-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-semibold text-muted-foreground">
                Предложений еще не создано
              </span>
              <span className="max-w-md text-center font-medium text-muted-foreground">
                На данный момент нет ни одного предложения или ошибки, созданого
                пользователем, вы можете быть первым
              </span>
            </div>
          </div>
        )}
      </div>

      {filteredFeedback?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Нет предложений или ошибок</p>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: IProposalsDto["status"] }) {
  return (
    // <Badge
    //   variant="secondary"
    //   className={cn(
    //     "absolute top-4 right-4",
    //     status === "in_progress" && "bg-blue-100 text-blue-700",
    //     status === "pending" && "bg-yellow-100 text-yellow-700",
    //     status === "rejected" && "bg-red-100 text-red-700",
    //   )}
    // >
    //   {status === "in_progress" && "В работе"}
    //   {status === "pending" && "На рассмотрении"}
    //   {status === "rejected" && "Отклонено"}
    // </Badge>
    <Badge
      variant="secondary"
      className="bg-background"
      // className={cn(
      //   "",
      //   status === "in_progress" && "bg-blue-100 text-blue-700",
      //   status === "pending" && "bg-yellow-100 text-yellow-700",
      //   status === "rejected" && "bg-red-100 text-red-700",
      // )}
    >
      {status === "in_progress" && "В работе"}
      {status === "pending" && "Рассматриваем"}
      {status === "rejected" && "Отклонено"}
    </Badge>
  );
}
