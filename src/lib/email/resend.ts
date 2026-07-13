import type { SendEmailInput } from "@/lib/email/send";

export async function sendResendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Email is not configured. Add RESEND_API_KEY to your environment.");
  }

  const from =
    process.env.EMAIL_FROM?.trim() || "VidCarry <onboarding@resend.dev>";
  const replyTo = input.replyTo?.trim() || process.env.EMAIL_REPLY_TO?.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to.trim()],
      subject: input.subject,
      text: input.text,
      ...(input.html ? { html: input.html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { message?: string; error?: string }
      | null;
    const detail = data?.message || data?.error || response.statusText;
    throw new Error(detail || "Could not send email.");
  }

  return response.json();
}
