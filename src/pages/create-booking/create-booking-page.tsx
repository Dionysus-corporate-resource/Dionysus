// import AdvertisingCard from "@/entities/advertising-card/advertising-card";
import { userApi } from "@/feature/auth/profile/api/user-api";
import { MultiStepForm } from "@/feature/multi-step-form";
import PageLoader from "@/shared/ui/page-loader";
import RequsetBlockingCreateRoles from "@/widgets/request-blocking-create/request-blocking-create";
// import RequsetBlockingCreate from "@/widgets/request-blocking-create/request-blocking-create";
import { useQuery } from "@tanstack/react-query";

export default function CreateBookingPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getDataProfile(),
  });

  return (
    <div
      className="container relative mx-auto flex flex-1 md:grid gap-6
       ex:p-2 sm:px-4 sm:pt-4 md:px-6 md:pt-6 lg:pt-6"
    >
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        {isLoading ? <PageLoader /> : <MultiStepForm />}
      </div>
      {/* <RequsetBlockingCreate user={userData} /> */}
      <RequsetBlockingCreateRoles user={data} />
    </div>
  );
}
