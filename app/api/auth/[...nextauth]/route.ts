import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple authentication - you can enhance this with database users later
        // Default credentials (CHANGE THESE!)
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@notraffic.tech'
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'NoTraffic2024!'

        if (credentials?.email === ADMIN_EMAIL && credentials?.password === ADMIN_PASSWORD) {
          return {
            id: '1',
            email: ADMIN_EMAIL,
            name: 'Admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session }) {
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
})

export { handler as GET, handler as POST }

