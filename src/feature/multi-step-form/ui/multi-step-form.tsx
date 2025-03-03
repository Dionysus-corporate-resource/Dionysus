import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

import { FormData, Step } from "../model/types";
import { BasicInfoStep } from "./steps/basic-info-step";
import { ReviewStep } from "./steps/review-step";
import { Stepper } from "./components/stepper";
import { ConditionsTransportation } from "./steps/conditions-transportation";
import { ConfirmationStep } from "./steps/confirmation-step";
import { DetailTransportation } from "./steps/detail-transportation";
import { AdditionalTransportation } from "./steps/additional-conditions";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/model/api/query-client";
import { toast } from "@/shared/hooks/use-toast";
// import { cityesLocations } from "@/shared/lib/cityes";

const steps: Step[] = [
  {
    id: 1,
    title: "Основная информация",
    description: "Необходимое для заявки",
  },
  {
    id: 2,
    title: "Условия перевозки",
    description: "Важно для перевозчика",
  },
  {
    id: 3,
    title: "Детали перевозки",
    description: "Уточнения по заявке",
  },
  {
    id: 4,
    title: "Дополнительные условия",
    description: "Контакты и то, что не смогли указать",
  },
  {
    id: 5,
    title: "Проверка данных",
    description: "Проверка заполнености обязательных полей",
  },

  {
    id: 6,
    title: "Подтверждение",
    description: "Создание заявки",
  },
];

export default function CreateBookingStepForm() {
  const createBookingMutation = useMutation({
    mutationFn: (data: FormData) => bookingApi.create(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать заявку",
        variant: "destructive",
      });
    },
  });

  const user = useAtomValue(userStorageAtom);
  const navigate = useNavigate();
  const [isViewMap, setIsViewMap] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      distance: "",
      loadingLocation: {
        name: "",
        coordinates: null,
      },
      unLoadingLocation: "",
      tonnage: "",
      culture: "",
    },
    conditionsTransportation: {
      loadingMethod: "",
      scaleCapacity: "",
      loadingDate: new Date(),
    },
    detailTransportation: {
      demurrage: "Со вторых суток, по 2000 ₽/день",
      allowedShortage: "",
      paymentType: "cash",
      ratePerTon: "",
      paymentDeadline: "3~5 банковских дней",
    },
    additionalConditions: {
      additionalInformation: "",
      contacts: [
        {
          name: user?.userName || "Заказчик",
          phone: user?.phone || "-",
        },
      ],
    },
  });

  // TODO: крутой подход
  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (
      formData?.basicInfo?.loadingLocation &&
      formData?.basicInfo?.unLoadingLocation &&
      formData?.basicInfo?.distance &&
      formData?.basicInfo?.culture &&
      formData?.detailTransportation?.ratePerTon &&
      formData?.additionalConditions?.contacts.length > 0
    ) {
      console.log("Form submitted:", formData);
      createBookingMutation.mutate(formData, {
        onSuccess: () => {
          handleNext();
          setTimeout(() => {
            navigate("/my-booking");
          }, 1500);
        },
      });
    } else {
      toast({
        title: "Заполните все обязательные поля формы!",
        description: "Есть обязательные поля, которые вам необходимо заполнить",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    const props = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
      isLastStep: currentStep === steps.length - 1,
    };

    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            {...props}
            isViewMap={isViewMap}
            setIsViewMap={setIsViewMap}
          />
        );
      case 2:
        return <ConditionsTransportation {...props} />;
      case 3:
        return <DetailTransportation {...props} />;
      case 4:
        return <AdditionalTransportation {...props} />;
      case 5:
        return <ReviewStep {...props} />;
      case 6:
        return <ConfirmationStep />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full shadow-none space-y-10">
      <div
        className="space-y-0
        xl:space-y-6"
      >
        <Stepper steps={steps} currentStep={currentStep} />
        {renderStep()}
      </div>
      {currentStep < steps.length && (
        <div className="flex justify-end ex:gap-2 gap-4 mx-auto pb-4 ex:flex-col">
          <Button
            variant="secondary"
            className="ex:text-xs"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Предыдущий этап
          </Button>
          <Button
            className="ex:text-xs bg-primary/85"
            onClick={
              currentStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {currentStep === steps.length - 1
              ? "Создать заявку"
              : "Следующий этап"}
          </Button>
        </div>
      )}
    </div>
  );
}
