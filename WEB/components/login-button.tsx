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

'use client';

export default function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={session.user?.image || ""}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span>{session.user?.name}</span>
      </div>
    );
  }

  return null;
}