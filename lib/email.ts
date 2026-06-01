import { contacts } from '@/lib/contacts';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

function generateHtml({ title, body }: { title: string; body: string }): string {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <style>body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f4f4f4}
    .container{max-width:600px;margin:20px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)}
    .header{background:#1E3D59;color:#fff;padding:24px;text-align:center}
    .header h1{margin:0;font-size:20px}
    .body{padding:24px;color:#333;line-height:1.6}
    .footer{background:#f8f9fa;padding:16px 24px;text-align:center;font-size:12px;color:#666}
    .btn{display:inline-block;padding:12px 24px;background:#00B4D8;color:#fff;text-decoration:none;border-radius:6px;margin:16px 0}
    </style></head><body>
    <div class="container">
      <div class="header"><h1>${title}</h1></div>
      <div class="body">${body}</div>
      <div class="footer">&copy; ${new Date().getFullYear()} DoDave Academy. All rights reserved.</div>
    </div></body></html>
  `;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const html = generateHtml({
    title: payload.subject,
    body: payload.html,
  });

  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || contacts.fromEmail,
          to: payload.to,
          subject: payload.subject,
          html,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error('[EMAIL SEND FAILED]', err);
      }
      return;
    } catch (err) {
      console.error('[EMAIL SEND ERROR]', err);
    }
  }

  console.log(`[EMAIL MOCK] To: ${payload.to}, Subject: ${payload.subject}`);
  console.log(`[EMAIL MOCK] HTML: ${html.substring(0, 200)}...`);
}

export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to DoDave Academy!',
    html: `<p>Hi <strong>${name}</strong>,</p>
<p>Welcome to DoDave Academy! Your account has been created successfully.</p>
<p>Start exploring our courses and begin your learning journey today.</p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses" class="btn">Browse Courses</a></p>`,
  }),

  resetPassword: (link: string) => ({
    subject: 'Reset Your Password',
    html: `<p>You requested a password reset.</p>
<p>Click the button below to reset your password. This link expires in 1 hour.</p>
<p><a href="${link}" class="btn">Reset Password</a></p>
<p>If you did not request this, please ignore this email.</p>`,
  }),

  purchaseReceipt: (courseName: string, amount: number) => ({
    subject: `Receipt: ${courseName}`,
    html: `<p>Thank you for your purchase!</p>
<p><strong>Course:</strong> ${courseName}</p>
<p><strong>Amount:</strong> ${amount.toLocaleString()} XAF</p>
<p>You can now access your course from your student dashboard.</p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/student" class="btn">Go to Dashboard</a></p>`,
  }),

  changeEmail: (name: string, link: string) => ({
    subject: 'Confirm Your New Email',
    html: `<p>Hi <strong>${name}</strong>,</p>
<p>Please click the button below to confirm your new email address.</p>
<p><a href="${link}" class="btn">Confirm Email</a></p>
<p>If you did not request this change, please contact support.</p>`,
  }),

  courseValidated: (courseName: string) => ({
    subject: `Course Published: ${courseName}`,
    html: `<p>Congratulations!</p>
<p>Your course <strong>"${courseName}"</strong> has been validated and is now published.</p>
<p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses" class="btn">View Course</a></p>`,
  }),
};
