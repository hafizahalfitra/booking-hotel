import Link from "next/link";
import Image from "next/image";
import { IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, IoArrowForward } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="relative bg-[#0A0F1A] text-slate-300 overflow-hidden">
            {/* Dekorasi Cahaya Halus (Modern Touch) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C2A895]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-screen-xl mx-auto px-6 pt-20 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

                    {/* BRAND SECTION */}
                    <div className="md:col-span-5 space-y-8">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
                            <Image
                                src="/logo.png"
                                width={150}
                                height={60}
                                alt="Logo"
                                className="brightness-125 contrast-125"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm text-slate-400 font-light">
                            Menghadirkan standar baru keramahan di Bandar Lampung. Kami menggabungkan kenyamanan modern dengan sentuhan elegan untuk pengalaman menginap yang tak terlupakan.
                        </p>
                        
                        {/* Social Icons - Glass Style */}
                        <div className="flex gap-4">
                            {[
                                { icon: <IoLogoInstagram />, label: "IG" },
                                { icon: <IoLogoFacebook />, label: "FB" },
                                { icon: <IoLogoTwitter />, label: "TW" }
                            ].map((social, index) => (
                                <div key={index} className="w-10 h-10 rounded-xl bg-slate-800/40 backdrop-blur-md border border-slate-700/50 flex items-center justify-center hover:bg-[#C2A895] hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                                    <span className="text-lg">{social.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C2A895] mb-8">
                            Navigasi
                        </h4>
                        <ul className="space-y-5">
                            {[
                                { name: "Beranda", href: "/" },
                                { name: "Tentang Kami", href: "/about" },
                                { name: "Koleksi Kamar", href: "/room" },
                                { name: "Hubungi Kami", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium hover:text-white transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="h-[1px] w-0 bg-[#C2A895] group-hover:w-4 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* NEWSLETTER SECTION */}
                    <div className="md:col-span-4">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C2A895] mb-8">
                            Newsletter
                        </h4>
                        <p className="text-sm text-slate-400 mb-6 font-light">
                            Dapatkan penawaran eksklusif dan update terbaru langsung di inbox Anda.
                        </p>

                        <form className="space-y-3">
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Alamat Email..."
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C2A895]/30 focus:border-[#C2A895] transition-all duration-300"
                                />
                                <button
                                    className="absolute right-2 top-2 bottom-2 px-4 bg-[#C2A895] text-white rounded-xl hover:bg-[#b09683] transition-all flex items-center justify-center"
                                    aria-label="Subscribe"
                                >
                                    <IoArrowForward className="text-xl" />
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-500 italic px-2">
                                *Kami menghargai privasi Anda sepenuhnya.
                            </p>
                        </form>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                            © 2026 HOTEL BANDAR LAMPUNG.
                        </p>
                        <p className="text-[10px] text-slate-600 uppercase tracking-widest">
                            Refining Luxury Hospitality
                        </p>
                    </div>
                    
                    <div className="flex gap-8">
                        <Link href="#" className="text-[11px] text-slate-500 hover:text-[#C2A895] uppercase tracking-widest transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-[11px] text-slate-500 hover:text-[#C2A895] uppercase tracking-widest transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;