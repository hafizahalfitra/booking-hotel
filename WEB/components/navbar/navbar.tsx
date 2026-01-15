import Image from "next/image"
import Link from "next/link"
import Navlink from "@/components/navbar/navlink";

const Navbar = () => {
    return (
        // Menggunakan backdrop-blur agar terlihat transparan mewah saat scroll
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">
                    
                    {/* Brand Logo */}
                    <Link href="/" className="relative z-10 hover:opacity-80 transition-opacity">
                        <Image 
                            src="/logo.png" 
                            alt="logo" 
                            width={140} 
                            height={54} 
                            className="w-auto h-10 md:h-12 object-contain"
                            priority 
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <Navlink />
                        </div>

                        {/* Mobile Menu Trigger (Opsional jika ada di Navlink) */}
                        <div className="md:hidden flex items-center">
                            <Navlink />
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar