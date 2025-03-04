import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { IBooking } from "@/shared/model/types/booking";

export function DetailTransportation({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: unknown) => {
    const newDetailTransportation = {
      ...formData.detailTransportation,
      [field]: value,
    };

    updateFormData({
      detailTransportation: newDetailTransportation,
    });
  };

  return (
    <div
      className="grid gap-6 p-2 rounded-lg
      es:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {/* Простой */}
      <div className="space-y-2">
        <Label
          htmlFor="demurrage"
          className="flex items-center justify-between gap-2"
        >
          <span>Простой *</span>
          {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
            Желательное поле
          </Badge> */}
        </Label>
        <Input
          id="demurrage"
          placeholder="Это поле можно оставить пустым"
          className={`transition-all ${errors.demurrage ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.demurrage}
          onChange={(e) => handleChange("demurrage", e.target.value)}
        />
        {errors.demurrage && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.demurrage}
          </p>
        )}
      </div>

      {/* Допустимая недостача */}
      <div className="space-y-2">
        <Label
          htmlFor="allowedShortage"
          className="flex items-center justify-between gap-2"
        >
          {/* <Percent className="w-4 h-4" /> */}
          <span>Допустимая недостача *</span>
          {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
            Желательное поле
          </Badge> */}
        </Label>
        <Input
          id="allowedShortage"
          placeholder="Это поле можно оставить пустым"
          className={`transition-all ${errors.allowedShortage ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.allowedShortage}
          onChange={(e) => handleChange("allowedShortage", e.target.value)}
        />
        {errors.allowedShortage && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.allowedShortage}
          </p>
        )}
      </div>

      {/* Вид оплаты */}
      <div className="space-y-2">
        <Label
          htmlFor="paymentType"
          className="flex items-end justify-between gap-2"
        >
          {/* <Wallet className="w-4 h-4" /> */}
          <span>Тип оплаты *</span>
          <Badge
            variant="secondary"
            className={cn(
              "hidden",
              !formData?.detailTransportation?.paymentType &&
                "block text-red-400 bg-red-50",
            )}
          >
            Обязательное поле
          </Badge>
        </Label>
        <Select
          value={formData.detailTransportation?.paymentType}
          onValueChange={(
            value: IBooking["detailTransportation"]["paymentType"],
          ) => handleChange("paymentType", value)}
        >
          <SelectTrigger
            className={`w-full ${errors.paymentType ? "border-destructive" : ""}`}
          >
            <SelectValue placeholder="Выберите тип оплаты" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Тип оплаты</SelectLabel>
              <SelectItem value="cash">Наличный</SelectItem>
              <SelectItem value="without_nds">Без НДС</SelectItem>
              <SelectItem value="nds">С НДС</SelectItem>
              <SelectItem value="nds_20">С НДС 20%</SelectItem>
              <SelectItem value="nds_15">С НДС 15%</SelectItem>
              <SelectItem value="nds_10">С НДС 10%</SelectItem>
              <SelectItem value="nds_5">С НДС 5%</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.paymentType && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.paymentType}
          </p>
        )}
      </div>

      {/* Ставка */}
      <div className="space-y-2">
        <Label
          htmlFor="ratePerTon"
          className="flex items-end justify-between gap-2"
        >
          {/* <BanknoteIcon className="w-4 h-4" /> */}
          <span>Ставка ₽/тонна *</span>
          <Badge
            variant="secondary"
            className={cn(
              "hidden",
              !formData?.detailTransportation?.ratePerTon &&
                "block text-red-400 bg-red-50",
            )}
          >
            Обязательное поле
          </Badge>
        </Label>
        <Input
          id="ratePerTon"
          placeholder="Укажите ставку за тонну"
          className={`transition-all ${errors.ratePerTon ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.ratePerTon}
          onChange={(e) =>
            handleChange("ratePerTon", e.target.value.replace(/\D/g, ""))
          }
        />
        {errors.ratePerTon && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.ratePerTon}
          </p>
        )}
      </div>

      {/* Сроки оплаты */}
      <div className="space-y-2">
        <Label
          htmlFor="paymentDeadline"
          className="flex items-center justify-between gap-2"
        >
          {/* <Route className="w-4 h-4" /> */}
          <span>Сроки оплаты *</span>
          {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
            Желательное поле
          </Badge> */}
        </Label>
        <Input
          id="paymentDeadline"
          placeholder="Это поле можно оставить пустым"
          className={`transition-all ${errors.paymentDeadline ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.paymentDeadline}
          onChange={(e) => handleChange("paymentDeadline", e.target.value)}
        />
        {errors.paymentDeadline && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.paymentDeadline}
          </p>
        )}
      </div>
    </div>
  );
}
