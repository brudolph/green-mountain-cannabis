import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import { sendPasswordResetEmail } from './lib/mail';

let sessionSecret = process.env.SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = 'm9xMLhJrrUraq7RTo2Cwz8kWBazcpNYhs3jE7t';
  }
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    sendToken: async ({ identity, token }) => {
      console.log(`passwordResetLink ${token}`)
      await sendPasswordResetEmail(token, identity);
    },
    tokensValidForMins: 60,
  }
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
