"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useAuth } from "../../src/store/auth";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  // helper untuk cek menu aktif
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // class dasar link
const linkClass = (href: string) =>
  clsx(
    "relative block py-2 px-3 md:p-0 transition-all duration-300",
    isActive(href)
      ? `
        text-[#C9A24D] 
        md:after:content-[''] 
        md:after:absolute 
        md:after:-bottom-1 
        md:after:left-0 
        md:after:w-full 
        md:after:h-[2px] 
        md:after:bg-[#C9A24D]
      `
      : `
        text-gray-800 
        hover:text-[#C9A24D] 
        hover:bg-gray-100 
        md:hover:bg-transparent
      `
  );


  return (
    <>
      {/* BUTTON MOBILE */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-gray-500
        rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      {/* MENU */}
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !open,
        })}
      >
        <ul
          className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm
          bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0
          md:bg-white"
        >
          {/* HOME */}
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          {/* ABOUT */}
          <li>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
          </li>

          {/* ROOMS (LOGIN) */}
          {mounted && user && (
            <li>
              <Link href="/room" className={linkClass("/room")}>
                Rooms
              </Link>
            </li>
          )}

          {/* CONTACT */}
          <li>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
          </li>

          {/* TRANSAKSI */}
          {mounted && user && (
            <li>
              <Link href="/transaksi" className={linkClass("/transaksi")}>
                My Reservation
              </Link>
            </li>
          )}

          {/* AUTH */}
          <li className="pt-4 md:pt-0">
            {!mounted ? (
              <div className="py-2.5 px-6 bg-gray-200 text-transparent rounded-sm">
                Loading
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-gray-800 text-xs md:text-sm">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="py-1.5 px-3 bg-gray-200 text-gray-800
                  text-xs md:text-sm rounded-sm hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2.5 px-6 bg-[#C2A895] text-white
                hover:bg-[#b39683] rounded-sm inline-block"
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
