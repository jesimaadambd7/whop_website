import type { Submission, SubmissionType } from "@/lib/admin/types";
import { sendEmail } from "@/lib/email/send";
import { siteConfig } from "@/lib/data/site";

function getInquiryTypeLabel(type: SubmissionType) {
  if (type === "creative-audit") return "Creative audit request";
  if (type === "creator") return "Creator signup";
  if (type === "career") return "Career application";
  if (type === "talent") return "Talent request";
  return "Contact inquiry";
}

function buildInquiryReplyText(submission: Submission, body: string) {
  const greeting = submission.name.trim() ? `Hi ${submission.name},` : "Hi there,";

  return [
    greeting,
    "",
    `Thanks for reaching out to ${siteConfig.name} about your ${getInquiryTypeLabel(submission.type).toLowerCase()}.`,
    "",
    body.trim(),
    "",
    "If you have more details to share, just reply to this email.",
    "",
    `— ${siteConfig.name}`,
    siteConfig.url,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInquiryReplyHtml(submission: Submission, body: string) {
  const greeting = submission.name.trim() ? `Hi ${escapeHtml(submission.name)},` : "Hi there,";
  const supportEmail = process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email;
  const formattedBody = escapeHtml(body.trim()).split("\n").join("<br />");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#0b0d12;font-family:Arial,Helvetica,sans-serif;color:#e4e4e7;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:600px;background:#12151d;border:1px solid #272a33;border-radius:24px;padding:32px 28px;">
            <tr>
              <td style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#38bdf8;padding-bottom:16px;">
                Reply from ${escapeHtml(siteConfig.name)}
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:#a1a1aa;padding-bottom:20px;">
                ${greeting}<br /><br />
                Thanks for reaching out about your ${escapeHtml(getInquiryTypeLabel(submission.type).toLowerCase())}.
              </td>
            </tr>
            <tr>
              <td style="background:#0b0d12;border:1px solid #272a33;border-radius:16px;padding:20px;font-size:15px;line-height:1.8;color:#d4d4d8;">
                ${formattedBody}
              </td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:13px;line-height:1.7;color:#71717a;">
                Reply to this email if you want to share more details.<br />
                Support: <a href="mailto:${escapeHtml(supportEmail)}" style="color:#38bdf8;">${escapeHtml(supportEmail)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function notifyInquiryReply(submission: Submission, body: string) {
  if (!submission.email.trim()) {
    throw new Error("This inquiry does not have a customer email.");
  }

  await sendEmail({
    to: submission.email,
    subject: `Re: your ${getInquiryTypeLabel(submission.type)} — ${siteConfig.name}`,
    text: buildInquiryReplyText(submission, body),
    html: buildInquiryReplyHtml(submission, body),
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email,
  });
}

function buildInquiryConfirmationText(submission: Submission) {
  const greeting = submission.name.trim() ? `Hi ${submission.name},` : "Hi there,";

  return [
    greeting,
    "",
    `Thanks for contacting ${siteConfig.name}. We received your ${getInquiryTypeLabel(submission.type).toLowerCase()}.`,
    "",
    submission.summary,
    "",
    "Our team will review your message and reply by email with next steps, scope questions, or a call link.",
    "",
    `Reference: ${submission.id}`,
    "",
    `— ${siteConfig.name}`,
    siteConfig.url,
  ].join("\n");
}

function buildInquiryConfirmationHtml(submission: Submission) {
  const greeting = submission.name.trim() ? `Hi ${escapeHtml(submission.name)},` : "Hi there,";
  const supportEmail = process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email;
  const summary = escapeHtml(submission.summary).split("\n").join("<br />");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#0b0d12;font-family:Arial,Helvetica,sans-serif;color:#e4e4e7;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:600px;background:#12151d;border:1px solid #272a33;border-radius:24px;padding:32px 28px;">
            <tr>
              <td style="font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#38bdf8;padding-bottom:16px;">
                Inquiry received
              </td>
            </tr>
            <tr>
              <td style="font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;padding-bottom:12px;">
                Thanks — we got your message
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:#a1a1aa;padding-bottom:20px;">
                ${greeting}<br /><br />
                We received your ${escapeHtml(getInquiryTypeLabel(submission.type).toLowerCase())} and our team is reviewing it now.
              </td>
            </tr>
            <tr>
              <td style="background:#0b0d12;border:1px solid #272a33;border-radius:16px;padding:20px;font-size:15px;line-height:1.8;color:#d4d4d8;">
                ${summary}
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px;font-size:14px;line-height:1.7;color:#a1a1aa;">
                We usually reply with next steps, scope questions, or a call link. Watch your inbox for our response.
              </td>
            </tr>
            <tr>
              <td style="padding-top:16px;font-size:12px;color:#71717a;">
                Reference: ${escapeHtml(submission.id)}
              </td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:13px;line-height:1.7;color:#71717a;">
                Questions? Contact
                <a href="mailto:${escapeHtml(supportEmail)}" style="color:#38bdf8;">${escapeHtml(supportEmail)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function notifyInquiryConfirmation(submission: Submission) {
  if (!submission.email.trim()) {
    throw new Error("This inquiry does not have a customer email.");
  }

  await sendEmail({
    to: submission.email,
    subject: `We received your inquiry — ${siteConfig.name}`,
    text: buildInquiryConfirmationText(submission),
    html: buildInquiryConfirmationHtml(submission),
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || siteConfig.email,
  });
}
