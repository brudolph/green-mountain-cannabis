import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  // @ts-ignore
  host: "localhost",
  port: 587,
  secure: false,
  auth: {
    user: "project.1",
    pass: "secret.1",
  },
});

function makeEmail(text: string) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 1.25rem;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>Green Mountain Cannabis</p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: (string)[] | null;
  rejected?: (null)[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to?: (string)[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  console.log("to", to);

  const info = await transport.sendMail({
    to,
    from: 'momentumdd@me.com',
    subject: 'Your password reset token!',
    html: makeEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  });
  if (process.env.MAIL_USER?.includes('ethereal.email')) {
    console.log(`� Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}