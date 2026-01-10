import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-screen-xl mx-auto px-6 py-16">
                <div className="grid gap-12 md:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image src="/logo.png" width={140} height={55} alt="Logo" />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Pengalaman menginap terbaik di Lampung dengan hotel premium,
                            pelayanan profesional, dan harga kompetitif.
                        </p>
                    </div>

                    {/* Menu */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-6">
                            Menu
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/room" className="hover:text-white transition">
                                    Kamar & Harga
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-6">
                            Berlangganan
                        </h4>
                        <p className="text-sm mb-5">
                            Promo eksklusif & rekomendasi hotel langsung ke email Anda.
                        </p>

                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                            />
                            <button className="bg-[#C2A895] hover:bg-[#b39683] text-white py-3 rounded-lg font-semibold transition">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-16 pt-6 text-center text-sm">
                    © 2025 Hotel Bandar Lampung. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
