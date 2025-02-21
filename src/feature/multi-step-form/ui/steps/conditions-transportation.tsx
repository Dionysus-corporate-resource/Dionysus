import { ChangeEvent, useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
// import { Badge } from "@/shared/components/ui/badge";

export function ConditionsTransportation({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const filteredValue = value.replace(/\D/g, "");
    updateFormData({
      conditionsTransportation: {
        ...formData.conditionsTransportation,
        [name]: filteredValue,
      },
    });
  };

  return (
    <div
      className="grid gap-6 rounded-lg
      ex:grid-cols-1 ex:p-2 sm:grid-cols-2 lg:grid-cols-3"
    >
      {/* Способ погрузки */}
      <div className="space-y-2">
        <Label
          htmlFor="distance"
          className="flex items-center justify-between gap-2"
        >
          <span>Способ погрузки *</span>
          {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
            Желательное поле
          </Badge> */}
        </Label>
        <Input
          id="loadingMethod"
          placeholder="Укажите способ погрузки"
          className="transition-all"
          value={formData.conditionsTransportation?.loadingMethod}
          onChange={(e) =>
            updateFormData({
              conditionsTransportation: {
                ...formData.conditionsTransportation,
                loadingMethod: e.target.value,
              },
            })
          }
        />
        {errors.loadingMethod && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.loadingMethod}
          </p>
        )}
      </div>

      {/* Грузо-подъемность весов */}
      <div className="space-y-2">
        <Label
          htmlFor="tonnage"
          className="flex items-center justify-between gap-2"
        >
          <span>Грузо-подъемность весов (тонн) *</span>
          {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
            Желательное поле
          </Badge> */}
        </Label>
        <Input
          id="scaleCapacity"
          name="scaleCapacity"
          placeholder="Укажите грузо-подъемность весов"
          className="transition-all"
          value={formData.conditionsTransportation?.scaleCapacity}
          onChange={handleChange}
        />
        {errors.scaleCapacity && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.scaleCapacity}
          </p>
        )}
      </div>

      {/* Начало погрузки */}
      <div className="space-y-2 ">
        <Label
          htmlFor="loadingLocation"
          className="flex items-center justify-between gap-2"
        >
          <span>Начало погрузки *</span>
          {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
            Желательное поле
          </Badge> */}
        </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData?.conditionsTransportation?.loadingDate &&
                  "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {formData?.conditionsTransportation?.loadingDate ? (
                format(formData?.conditionsTransportation?.loadingDate, "PPP", {
                  locale: ru,
                })
              ) : (
                <span>Выберите дату погрузки</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={ru}
              selected={formData?.conditionsTransportation?.loadingDate}
              onSelect={(value) => {
                updateFormData({
                  conditionsTransportation: {
                    ...formData.conditionsTransportation,
                    loadingDate: value ?? new Date(),
                  },
                });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {errors.loadingDate && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.loadingDate}
          </p>
        )}
      </div>
    </div>
  );
}
