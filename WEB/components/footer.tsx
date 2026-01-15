import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800">
            <div className="max-w-screen-xl mx-auto px-6 py-16">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* BRAND - 5 Columns for wide feel */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                            <Image
                                src="/logo.png"
                                width={140}
                                height={55}
                                alt="Logo"
                                className="brightness-110"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm text-slate-400">
                            Platform pemesanan hotel terpercaya di Lampung. Kami menghadirkan
                            pengalaman menginap yang eksklusif, nyaman, dan aman untuk perjalanan Anda.
                        </p>
                        {/* Optional Social Icons - Menambah kesan modern */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#C9A24D] transition-colors cursor-pointer">
                                <span className="text-xs">IG</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#C9A24D] transition-colors cursor-pointer">
                                <span className="text-xs">FB</span>
                            </div>
                        </div>
                    </div>

                    {/* LINKS - 3 Columns */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                            Navigasi
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Tentang Kami", href: "/about" },
                                { name: "Kamar", href: "/room" },
                                { name: "Kontak", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-[#C9A24D] transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-[#C9A24D] mr-0 group-hover:mr-2 transition-all"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* NEWSLETTER - 4 Columns */}
                    <div className="md:col-span-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                            Newsletter
                        </h4>
                        <p className="text-sm text-slate-400 mb-6">
                            Dapatkan info promo eksklusif langsung di email Anda.
                        </p>

                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Email anda..."
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:border-[#C9A24D] transition-all"
                            />
                            <button
                                className="mt-3 w-full bg-[#C9A24D] py-3.5 rounded-xl font-bold text-slate-900 hover:bg-[#d29c2a] active:scale-[0.98] transition-all shadow-lg shadow-[#C9A24D]/20"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="border-t border-slate-800/60 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 italic">
                        © 2026 Hotel Bandar Lampung. Designed for Excellence.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;