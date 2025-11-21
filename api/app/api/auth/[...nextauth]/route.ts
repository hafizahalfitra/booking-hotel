"use server";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,      // ✅ BENAR - ! 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // ✅ BENAR - !
        })
    ],
});

export { handler as GET, handler as POST };