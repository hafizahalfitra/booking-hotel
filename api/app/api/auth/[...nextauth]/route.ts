// BOOKING-HOTEL/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // Tambahkan secret key di sini jika belum ada
    secret: process.env.NEXTAUTH_SECRET,
});

// Wajib: Export GET dan POST handler dari NextAuth
export { handler as GET, handler as POST };