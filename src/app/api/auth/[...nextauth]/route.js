import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    // Check AdminUser table
                    const user = await prisma.adminUser.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user || !user.isActive) return null;

                    // Compare password
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    // Fallback to hardcoded for initial setup (before first user is created)
                    if (
                        credentials.email === "admin@thinqchess.com" &&
                        credentials.password === "thinqchess@123"
                    ) {
                        return { id: "1", name: "Admin", email: "admin@thinqchess.com", role: "super_admin" };
                    }
                    return null;
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) { token.role = user.role; token.userId = user.id; }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) { session.user.role = token.role; session.user.id = token.userId; }
            return session;
        }
    },
    pages: { signIn: '/admin/login' },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-key-for-development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
