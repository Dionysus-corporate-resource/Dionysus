import { Button } from "@/shared/components/ui/button";
import { paymentApi } from "./model/paymentApi";
import { Rocket, TrendingUp, TrendingUpDown } from "lucide-react";
import { IPlan } from "@/entities/subscribe/ui/subscripe-card";

function getIconsForSubscription(typeSubscription: IPlan["type"]) {
  switch (typeSubscription) {
    case "limited":
      return <TrendingUpDown className="w-6 h-6" />;
    case "limitedPackage":
      return <TrendingUp className="w-6 h-6" />;
    case "unLimited":
      return <Rocket className="w-6 h-6" />;
    default:
      return <TrendingUp className="w-6 h-6" />;
  }
}

function getParamsPriceForBookingSubscription(typeSubscription: IPlan["type"]) {
  switch (typeSubscription) {
    case "limited":
      return { priceOneBooking: 1, countBooking: 1 };
    case "limitedPackage":
      return { priceOneBooking: 1, countBooking: 30 };

    default:
      return { priceOneBooking: 1, countBooking: 1 };
  }
}

function getParamsPriceForBookingSubscription2(typeSubscription: IPlan) {
  switch (typeSubscription.type) {
    case "showContact":
      // тут нужно передать нобязательный параметр, время подписки
      return {
        typeSubscriprion: "showContact",
        countMonthSubscribe: typeSubscription?.timeMonth ?? 1,
      };
    case "unLimited":
      return {
        typeSubscriprion: "unLimited",
        countMonthSubscribe: typeSubscription?.timeMonth ?? 1,
      };
    default:
      return { typeSubscriprion: "unLimited", countMonthSubscribe: 1 };
  }
}

const Payment = ({ subscription }: { subscription: IPlan }) => {
  return (
    <div className="application-card w-full">
      <Button
        className="w-full gap-4"
        variant={subscription.popular ? "default" : "secondary"}
        onClick={() => {
          if (
            subscription.type === "limited" ||
            subscription.type === "limitedPackage"
          ) {
            return paymentApi.handlePurchase(
              getParamsPriceForBookingSubscription(subscription.type),
            );
          } else if (
            subscription.type === "showContact" ||
            subscription.type === "unLimited"
          ) {
            return paymentApi.handleUnlimitSubscription(
              getParamsPriceForBookingSubscription2(subscription),
            );
          }
        }}
        size="lg"
      >
        Оформить тариф
        {getIconsForSubscription(subscription.type)}
      </Button>
    </div>
  );
};

export default Payment;
