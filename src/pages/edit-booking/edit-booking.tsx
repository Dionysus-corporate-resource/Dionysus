import EditBookingMultiStepForm from "@/feature/edit-booking-multi-step-form/ui/multi-step-form";

export default function EditBookingPage() {
  return (
    //md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px]
    <div
      className="container relative mx-auto flex flex-1 md:grid gap-6
     ex:p-2 sm:px-4 sm:pt-4 md:px-6 md:pt-6 lg:pt-6"
    >
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        <EditBookingMultiStepForm />
      </div>
    </div>
  );
}
