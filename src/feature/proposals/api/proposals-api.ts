import instance from "@/shared/model/api/axios-instance";
import { IProposals, IProposalsDto } from "@/shared/model/types/proposals";

export const proposalsApi = {
  getAll: async (): Promise<IProposalsDto[]> => {
    try {
      const response = await instance.get("/proposals-development");
      console.log("proposalsApi getAll", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (body: IProposals): Promise<IProposalsDto[]> => {
    try {
      const response = await instance.post("/proposals-development", body);
      console.log("proposalsApi create data", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
