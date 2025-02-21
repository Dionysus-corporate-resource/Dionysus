import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { FormData, Step } from "../model/types";
import { BasicInfoStep } from "./steps/basic-info-step";
import { ReviewStep } from "./steps/review-step";
import { Stepper } from "./stepper";
import { ConditionsTransportation } from "./steps/conditions-transportation";
import { ConfirmationStep } from "./steps/confirmation-step";
import { DetailTransportation } from "./steps/detail-transportation";
import { AdditionalTransportation } from "./steps/additional-conditions";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/model/api/query-client";
import { toast } from "@/shared/hooks/use-toast";
import { bookingQueryOption } from "@/pages/home/api/query-option";

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
    description: "Редактирование заявки",
  },
];

export default function EditBookingMultiStepForm() {
  const { bookingId } = useParams();

  const { data: bookingData } = useQuery(bookingQueryOption.getOne(bookingId!));
  // console.log("bookingData", bookingData);

  const createBookingMutation = useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      bookingApi.update(data, id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
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
        name: "Майкопский Район",
        coordinates: [44.6078, 40.1058],
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
          name: user?.userName ?? "Заказчик",
          phone: user?.phone ?? "-",
        },
      ],
    },
  });

  useEffect(() => {
    if (bookingData) {
      setFormData({
        basicInfo: {
          distance: bookingData?.basicInfo?.distance,
          loadingLocation: {
            name: bookingData?.basicInfo?.loadingLocation?.name,
            coordinates: bookingData?.basicInfo?.loadingLocation?.coordinates,
          },
          unLoadingLocation: bookingData?.basicInfo?.unLoadingLocation,
          tonnage: bookingData?.basicInfo?.tonnage ?? "",
          culture: bookingData?.basicInfo?.culture,
        },
        conditionsTransportation: {
          loadingMethod:
            bookingData?.conditionsTransportation?.loadingMethod ?? "",
          scaleCapacity:
            bookingData?.conditionsTransportation?.scaleCapacity ?? "",
          loadingDate: bookingData?.conditionsTransportation?.loadingDate,
        },
        detailTransportation: {
          demurrage: bookingData?.detailTransportation?.demurrage ?? "",
          allowedShortage:
            bookingData?.detailTransportation?.allowedShortage ?? "",
          paymentType: bookingData?.detailTransportation?.paymentType,
          ratePerTon: bookingData?.detailTransportation?.ratePerTon,
          paymentDeadline:
            bookingData?.detailTransportation?.paymentDeadline ?? "",
        },
        additionalConditions: {
          additionalInformation:
            bookingData?.additionalConditions?.additionalInformation ?? "",
          contacts: bookingData?.additionalConditions?.contacts,
        },
      });
    }
  }, [bookingData]);

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
      const data = formData;
      const id = bookingId as string;
      console.log("Form submitted:", data);
      createBookingMutation.mutate(
        { data, id },
        {
          onSuccess: () => {
            handleNext();
            setTimeout(() => {
              navigate("/my-booking");
            }, 1500);
          },
        },
      );
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
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        {/* <CardTitle>Форма создания заявки</CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-12">
        <Stepper steps={steps} currentStep={currentStep} />
        {renderStep()}
      </CardContent>
      {currentStep < steps.length && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Предыдущий этап
          </Button>
          <Button
            onClick={
              currentStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {currentStep === steps.length - 1
              ? "Отредактировать заявку"
              : "Следующий этап"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
