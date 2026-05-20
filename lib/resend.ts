import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCommentNotification({
  authorName,
  body,
}: {
  authorName: string;
  body: string;
}) {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "leonardo.luis.medina99@gmail.com",
      subject: `New comment from ${authorName}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Comment on Your Portfolio</h2>
          <p><strong>${authorName}</strong> said:</p>
          <p>${body}</p>
        </div>
      `,
    });
    console.log("EMAIL RESULT:", JSON.stringify(result));
  } catch (err) {
    console.error("EMAIL ERROR:", err);
  }
}
