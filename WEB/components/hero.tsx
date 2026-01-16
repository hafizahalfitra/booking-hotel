'use client'; 

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a]">
            {/* Background dengan Efek Slow Zoom */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.jpg"
                    alt="Hotel Bandar Lampung"
                    fill
                    priority
                    className="object-cover object-center scale-100 animate-[subtle-zoom_20s_ease-in-out_infinite]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center">
                
                {/* Modern Badge */}
                <div className="mb-6 py-2 px-5 border border-[#C2A895]/30 bg-white/5 backdrop-blur-md rounded-full shadow-2xl">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#C2A895]">
                        The Ultimate Luxury Stay
                    </p>
                </div>

                {/* Judul dengan Typography Modern */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-8 tracking-tighter text-white">
                    Pesan Kamar <br />
                    <span className="text-[#C2A895] drop-shadow-2xl italic font-serif">Mewah</span> Anda
                </h1>

                {/* Deskripsi */}
                <p className="text-sm md:text-xl text-gray-200/90 max-w-2xl mb-12 leading-relaxed font-light">
                    Nikmati pengalaman menginap eksklusif dengan harga terbaik <br className="hidden md:block" />
                    di Hotel Khusus Provinsi Lampung.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
                    <Link
                        href="/room"
                        className="group relative overflow-hidden bg-[#C2A895] text-white
                        px-10 py-4 rounded-2xl text-base md:text-lg font-bold
                        hover:bg-[#b39683] transition-all duration-300
                        shadow-2xl shadow-[#C2A895]/40 active:scale-95 w-full sm:w-auto text-center"
                    >
                        <span className="relative z-10">Book Now</span>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 opacity-40 group-hover:animate-[shine_0.75s]" />
                    </Link>

                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-10 py-4 rounded-2xl text-base md:text-lg font-bold
                        text-white border border-white/30 bg-white/5 backdrop-blur-xl
                        hover:bg-white hover:text-[#0f172a] transition-all duration-500
                        active:scale-95 text-center"
                    >
                        Contact
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#C2A895] to-transparent animate-bounce"></div>
            </div>

            {/* Style JSX memerlukan 'use client' */}
            <style jsx>{`
                @keyframes subtle-zoom {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                @keyframes shine {
                    100% { left: 125%; }
                }
            `}</style>
        </section>
    );
};

export default Hero;