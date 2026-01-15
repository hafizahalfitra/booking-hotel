import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-screen-xl mx-auto px-4 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* BRAND */}
                    <div>
                        <Link href="/" className="mb-6 block">
                            <Image
                                src="/logo.png"
                                width={130}
                                height={50}
                                alt="Logo"
                            />
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Platform pemesanan hotel terpercaya di Lampung untuk
                            pengalaman menginap yang nyaman dan aman.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div>
                        <h4 className="mb-6 text-lg font-semibold text-white">
                            Navigasi
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/room" className="hover:text-white">
                                    Kamar
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h4 className="mb-6 text-lg font-semibold text-white">
                            Newsletter
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                            Dapatkan info promo dan penawaran hotel terbaru.
                        </p>

                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="emailanda@gmail.com"
                                className="w-full px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C2A895]"
                            />
                            <button
                                className="w-full bg-[#C9A24D] py-3 rounded-md font-semibold text-white hover:bg-[#d29c2a] transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
                    © 2026 Hotel Bandar Lampung. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
