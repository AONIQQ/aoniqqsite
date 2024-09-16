import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define authentication options
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'text' },
      },
      // Here, you can add your custom logic for validating user credentials
      async authorize(credentials) {
        const adminUser = { id: '1', name: 'Admin', email: 'info@aoniqq.com' };

        if (credentials?.username === process.env.ADMIN_USERNAME && credentials?.password === process.env.ADMIN_PASSWORD) {
          return adminUser;
        }

        return null; // Invalid credentials
      },
    }),
  ],
  // Session settings
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin/login', // Custom sign-in page
  },
};