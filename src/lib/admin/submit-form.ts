import type { SubmissionType } from "@/lib/admin/types";

type SubmitOptions = {
  nameField?: string;
  omitFields?: string[];
};

export async function submitAdminForm(
  type: SubmissionType,
  form: HTMLFormElement,
  buildSummary: (payload: Record<string, string>) => string,
  options?: SubmitOptions,
) {
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries()) as Record<string, string>;

  for (const field of options?.omitFields ?? []) {
    delete payload[field];
  }

  const nameField = options?.nameField ?? "name";
  const response = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      name: payload[nameField]?.trim() || payload.name?.trim() || "Unknown",
      email: payload.email ?? "",
      summary: buildSummary(payload),
      payload,
    }),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }
}
