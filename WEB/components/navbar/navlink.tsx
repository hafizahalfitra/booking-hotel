// components/navbar/Navlink.tsx
"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useAuth } from "../../src/store/auth"; // ⬅️ DIUBAH: pakai relative path

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    router.push("/"); // balik ke home setelah logout
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500
        rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !open,
        })}
      >
        <ul
          className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm
            bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0
            md:bg-white"
        >
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100
                    rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100
                    rounded-sm md:hover:bg-transparent md:p-0"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/room"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100
                    rounded-sm md:hover:bg-transparent md:p-0"
            >
              Rooms
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100
                    rounded-sm md:hover:bg-transparent md:p-0"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="/myreservation"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100
                    rounded-sm md:hover:bg-transparent md:p-0"
            >
              My Reservation
            </Link>
          </li>

          {/* 👉 Bagian Sign In yang diubah */}
          <li className="pt-4 md:pt-0">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm hover:bg-gray-100"
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-gray-800 text-xs md:text-sm">
                    {user.name}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="py-1.5 px-3 bg-gray-200 text-gray-800 text-xs md:text-sm rounded-sm hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2.5 px-6 bg-[#C2A895] text-white hover:bg-[#b39683]
                    rounded-sm inline-block"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navlink;
