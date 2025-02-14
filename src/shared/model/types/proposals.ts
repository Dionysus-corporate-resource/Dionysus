export type IProposals = {
  name: string;
  description: string;
  topic: "bag" | "proposals";
};
export type IProposalsDto = {
  name: string;
  description: string;
  topic: "bag" | "proposals";
  status: "in_progress" | "pending" | "done" | "rejected";
  user: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
