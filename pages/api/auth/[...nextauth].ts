import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    // Sign in with passwordless email link
    Providers.Email({
      server: process.env.MAIL_SERVER,
      from: '<no-reply@invoicify.com>',
    }),
  ],
  // SQL or MongoDB database (or leave empty)
  database: process.env.MONGODB_URI,
});
