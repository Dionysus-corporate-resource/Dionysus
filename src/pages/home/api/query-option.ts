import { queryOptions } from "@tanstack/react-query";
import { bookingApi } from "./booking-api";
import { IBookingDto } from "@/shared/model/types/booking";

export const bookingQueryOption = {
  getAll: () => {
    return queryOptions({
      queryKey: ["booking"],
      queryFn: (): Promise<IBookingDto[]> => bookingApi.getAll(),
    });
  },
  getOne: (bookingId: string) => {
    return queryOptions({
      queryKey: ["booking", bookingId],
      queryFn: (): Promise<IBookingDto> => bookingApi.getOne(bookingId),
    });
  },
};
