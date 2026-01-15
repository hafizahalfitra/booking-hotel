import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative h-screen text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/hero.jpg"
                    alt="Hotel Bandar Lampung"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content - CENTER FIX */}
            <div className="relative z-10 flex h-full items-center justify-center text-center px-5">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                        Pesan Kamar <span className="text-[#C2A895]">Mewah</span> Anda
                    </h1>

                    <p className="text-sm md:text-lg text-gray-200 mb-10 leading-relaxed">
                        Nikmati pengalaman menginap eksklusif dengan harga terbaik
                        di Hotel Khusus Kota Bandar Lampung.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/room"
                            className="bg-[#C2A895] text-white
                            px-8 py-3 rounded-xl text-base md:text-lg font-semibold
                            hover:bg-[#b39683] transition-all
                            shadow-lg shadow-[#C2A895]/30
                            active:scale-95"
                        >
                            Pesan Sekarang
                        </Link>

                        <Link
                            href="/contact"
                            className="border border-[#C2A895] text-white
                            px-8 py-3 rounded-xl text-base md:text-lg font-semibold
                            hover:bg-[#C2A895] transition-all
                            active:scale-95"
                        >
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
