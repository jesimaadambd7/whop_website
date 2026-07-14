import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/data/site";
import { sendResendEmail } from "@/lib/email/resend";

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

function hasResendConfig() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

async function sendSmtpEmail(input: SendEmailInput) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) {
    throw new Error("SMTP is not fully configured.");
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const from = process.env.EMAIL_FROM?.trim() || `UGCViss <${user}>`;
  const replyTo = input.replyTo?.trim() || process.env.EMAIL_REPLY_TO?.trim();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: input.to.trim(),
    subject: input.subject,
    text: input.text,
    ...(input.html ? { html: input.html } : {}),
    ...(replyTo ? { replyTo } : {}),
    headers: {
      "X-Mailer": siteConfig.name,
      "X-Priority": "3",
    },
  });
}

export async function sendEmail(input: SendEmailInput) {
  if (hasSmtpConfig()) {
    return sendSmtpEmail(input);
  }

  if (hasResendConfig()) {
    return sendResendEmail(input);
  }

  throw new Error(
    "Email is not configured. Add Gmail SMTP settings (SMTP_HOST, SMTP_USER, SMTP_PASS) or RESEND_API_KEY.",
  );
}
