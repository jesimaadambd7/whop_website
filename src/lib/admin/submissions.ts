import { promises as fs } from "fs";
import path from "path";
import { seedSubmissions } from "@/lib/admin/seed-submissions";
import { getDataDir } from "@/lib/admin/data-dir";
import type {
  Submission,
  SubmissionStats,
  SubmissionStatus,
  SubmissionType,
} from "@/lib/admin/types";

const DATA_DIR = getDataDir();
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(seedSubmissions, null, 2), "utf8");
  }
}

async function readAll(): Promise<Submission[]> {
  await ensureStore();
  const raw = await fs.readFile(SUBMISSIONS_FILE, "utf8");
  return JSON.parse(raw) as Submission[];
}

async function writeAll(submissions: Submission[]) {
  await ensureStore();
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf8");
}

export async function listSubmissions(filters?: {
  type?: SubmissionType | "all";
  status?: SubmissionStatus | "all";
}): Promise<Submission[]> {
  const submissions = await readAll();
  const sorted = [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sorted.filter((submission) => {
    const typeMatch =
      !filters?.type || filters.type === "all" || submission.type === filters.type;
    const statusMatch =
      !filters?.status ||
      filters.status === "all" ||
      submission.status === filters.status;
    return typeMatch && statusMatch;
  });
}

export async function getSubmission(id: string) {
  const submissions = await readAll();
  return submissions.find((submission) => submission.id === id) ?? null;
}

export async function createSubmission(input: {
  type: SubmissionType;
  name: string;
  email: string;
  summary: string;
  payload: Record<string, string>;
}) {
  const submissions = await readAll();
  const prefix =
    input.type === "creative-audit"
      ? "audit"
      : input.type === "career"
        ? "career"
        : input.type === "talent"
          ? "talent"
          : input.type === "creator"
            ? "creator"
            : "contact";
  const id = `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
  const submission: Submission = {
    id,
    type: input.type,
    status: "new",
    name: input.name,
    email: input.email,
    summary: input.summary,
    createdAt: new Date().toISOString(),
    payload: input.payload,
  };

  submissions.unshift(submission);
  await writeAll(submissions);
  return submission;
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  const submissions = await readAll();
  const index = submissions.findIndex((submission) => submission.id === id);
  if (index === -1) return null;

  submissions[index] = { ...submissions[index], status };
  await writeAll(submissions);
  return submissions[index];
}

export async function deleteSubmission(id: string) {
  const submissions = await readAll();
  const next = submissions.filter((submission) => submission.id !== id);
  if (next.length === submissions.length) return false;
  await writeAll(next);
  return true;
}

export async function deleteCreatorInquiries(email: string, username?: string) {
  const submissions = await readAll();
  const normalizedEmail = normalizeEmail(email);
  const normalizedUsername = username?.trim().toLowerCase();

  const next = submissions.filter((submission) => {
    if (submission.type !== "creator") return true;
    if (normalizeEmail(submission.email) === normalizedEmail) return false;
    const payloadUsername = submission.payload.username?.trim().toLowerCase();
    if (normalizedUsername && payloadUsername === normalizedUsername) return false;
    return true;
  });

  if (next.length === submissions.length) return 0;
  await writeAll(next);
  return submissions.length - next.length;
}

export function getSubmissionStats(submissions: Submission[]): SubmissionStats {
  return submissions.reduce(
    (stats, submission) => {
      stats[submission.status] += 1;
      return stats;
    },
    { new: 0, reviewing: 0, replied: 0, closed: 0 },
  );
}
