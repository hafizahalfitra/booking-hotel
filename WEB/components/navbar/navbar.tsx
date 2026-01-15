import Image from "next/image"
import Link from "next/link"
import Navlink from "@/components/navbar/navlink";

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100/80">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="flex items-center justify-between h-20 md:h-22">

                    {/* Brand Logo */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={130}
                            height={50}
                            className="w-auto h-9 md:h-11 object-contain"
                            priority
                        />
                    </Link>

                    {/* Navigation Container */}
                    <div className="flex items-center gap-8">
                        {/* Navlink Desktop */}
                        <div className="hidden md:flex items-center">
                            <Navlink />
                        </div>

                        {/* CTA / Action Button (Opsional) */}
                        <div className="md:hidden">
                            <Navlink />
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar