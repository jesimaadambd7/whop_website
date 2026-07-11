export type SubmissionType =
  | "contact"
  | "creative-audit"
  | "career"
  | "talent"
  | "creator";

export type SubmissionStatus = "new" | "reviewing" | "replied" | "closed";

export type Submission = {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  name: string;
  email: string;
  summary: string;
  createdAt: string;
  payload: Record<string, string>;
};

export type SubmissionStats = {
  new: number;
  reviewing: number;
  replied: number;
  closed: number;
};
