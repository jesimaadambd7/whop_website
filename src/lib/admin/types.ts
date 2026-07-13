export type SubmissionType =
  | "contact"
  | "creative-audit"
  | "career"
  | "talent"
  | "creator";

export type SubmissionStatus = "new" | "reviewing" | "replied" | "closed";

export type SubmissionReply = {
  id: string;
  body: string;
  createdAt: string;
};

export type Submission = {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  name: string;
  email: string;
  summary: string;
  createdAt: string;
  payload: Record<string, string>;
  replies?: SubmissionReply[];
};

export type SubmissionStats = {
  new: number;
  reviewing: number;
  replied: number;
  closed: number;
};
