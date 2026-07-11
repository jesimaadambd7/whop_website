export type CreatorStatus = "pending" | "approved" | "rejected";

export type CreatorAccount = {
  id: string;
  displayName: string;
  username: string;
  email: string;
  password: string;
  passwordHash: string;
  status: CreatorStatus;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
};

export type CreatorAccountAdmin = Omit<CreatorAccount, "passwordHash">;

export type CreatorAccountPublic = Omit<CreatorAccount, "passwordHash" | "password">;

export const CREATOR_STATUSES: CreatorStatus[] = ["pending", "approved", "rejected"];

export type CreatorStats = {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
};
