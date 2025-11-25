"use server";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, // Mengambil ID klien dari variabel lingkungan
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Mengambil secret klien dari variabel lingkungan
        }),
    ],
});

export { handler as GET, handler as POST };