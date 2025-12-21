import Link from "next/link";
import Image from "next/image";
const Footer = () => {
    return (
        <footer className="bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
                <div className="grid md:grid-cols-3 gap-7">
                    <div>
                        <Link href="/" className="mb-10 block">
                            <Image src="/logo.png" width={128} height={49} alt="logo" />
                        </Link>
                        <p className="text-gray-400">
                            Kami adalah platform pemesanan hotel yang berfokus pada penyediaan akomodasi terbaik di seluruh Provinsi Lampung. Dengan jaringan hotel yang luas, kami membantu traveler menemukan tempat menginap yang nyaman, sesuai kebutuhan, dan dengan harga terbaik.
                        </p>
                    </div>
                    <div>
                        {/* Perbaiki sintaks TailwindCSS ini jika 'flex-gap-20' bukan kelas yang valid. Mungkin maksudnya 'gap-20' dalam flex container, atau 'space-x-20' */}
                        <div className="flex-gap-20"> 
                            <div className="flex-1 md:flex-none">
                                <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                                <ul className="list-item space-y-5 text-gray-400">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link href="/room">Rooms</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="flex-1 md:flex-none">
                                <li>
                                    </li>
                                <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
                                <ul className="list-item space-y-5 text-gray-400">
                                    <li>
                                        <Link href="#">Legal</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Syarat & Ketentuan</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Metode Pembayaran</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Kebijakan Privasi</Link>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-8 text-xl font-semibold text-white">Newslater</h4>
                        <p className="text-gray-400">
                            Temukan akomodasi terbaik dengan harga terjangkau untuk kenyamanan menginap Anda. Masukan anda sangat berarti bagi kami.
                        </p>
                        <form action="" className="mt-5">
                            <div className="mb-5">
                                {/* Gabungan: Menggunakan format Input yang ringkas + suppressHydrationWarning */}
                                <input
                                    type="text"
                                    name="email"
                                    className="w-full p-3 rounded-sm bg-white"
                                    placeholder="masukan_email_anda@gmail.com"
                                    suppressHydrationWarning
                                />
                            </div>
                            <button
                                // Gabungan: Menggunakan styling tombol yang lebih baik + hover dari Incoming
                                className="bg-[#C9A24D] p-3 font-bold text-white w-full text-center rounded-sm hover:bg-[#B08C3C]"
                                suppressHydrationWarning
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

{/*             
            <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center
        text-base text-gray-500">
                &copy; Copyright 2025 | Team Grand | All Right Reserved
            </div> */}

        </footer>
    )
}

export default Footer