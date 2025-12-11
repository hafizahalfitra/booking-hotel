// components/GoogleProvider.tsx
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

export default function GoogleProvider({ children }: Props) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
      <Toaster position="top-right" />
    </GoogleOAuthProvider>
  );
}
