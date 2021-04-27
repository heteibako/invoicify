import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import User from '@models/User';
import connectDB from '@config/db';

connectDB();
export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          if (!email || !password) {
            throw new Error('Whoops!');
          }
          const user = await User.findOne({ email }).select('+password');
          if (!user) {
            console.log('no user');
          }
          const isMatch = await user.matchPassword(password);
          if (!isMatch) {
            // return next(new ErrorResponse('A jelszó nem helyes!'), 401);
            throw new Error('A jelszó nem helyes!');
          }
          return user;
        } catch (error) {
          console.log('Error coming');
        }
      },
    }),
  ],
  session: {
    jwt: {
      secret: process.env.JWT_SECRET,
      encryption: true,
    },
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
    async session(session, user) {
      return session;
    },
  },

  database: process.env.MONGODB_URI,
});
