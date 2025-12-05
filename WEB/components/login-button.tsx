'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { FaG } from "react-icons/fa6";

export const LoginGoogleButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>Sign out</button>
        <p>Welcome, {session.user?.name}</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className='flex items-center justify-center gap-2 w-full bg-blue-700 text-white
        font-medium py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer'
    >
      <FaG className="size-6" />
      Masuk Dengan Google
    </button>
  );
};