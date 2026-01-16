import { Metadata } from "next"
import HeaderSection from "@/components/header-setion"
import { IoEyeOutline, IoLocateOutline, IoStarOutline, IoShieldCheckmarkOutline, IoTrendingUpOutline } from "react-icons/io5"
import Image from "next/image"

/**
 * METADATA: Digunakan untuk optimasi SEO pada halaman "Tentang Kami".
 * Next.js akan merender ini ke dalam tag <head> secara otomatis.
 */
export const metadata: Metadata = {
    title: "Tentang Kami | Hotel Bandar Lampung",
    description: "Online Booking Hotel Bandar Lampung",
}

const AboutPage = () => {
    return (
        // Wrapper Utama: Menggunakan background light gray dan memastikan tidak ada konten yang bocor ke samping (overflow-hidden)
        <div className="bg-[#FCFCFC] text-slate-900 overflow-hidden">

            {/* Memanggil Komponen Reusable HeaderSection untuk konsistensi UI antar halaman */}
            <HeaderSection
                title="Tentang Kami"
                subtitle="Mendefinisikan ulang standar kemewahan dan kenyamanan di gerbang Sumatera."
            />

            {/* SECTION 1: STORY & HERO IMAGE 
                Menggunakan sistem Grid 12 kolom untuk layout yang presisi di layar desktop
            */}
            <section className="max-w-screen-xl mx-auto py-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Sisi Kiri: Gambar (7 Kolom) 
                        Menggunakan container relative agar elemen floating di dalamnya bisa diposisikan secara absolut
                    */}                    
                    <div className="lg:col-span-7 relative">
                        <div className="relative z-10 overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-video lg:aspect-square shadow-2xl">
                        {/* Optimasi Gambar Next.js: fill digunakan agar gambar mengikuti ukuran container-nya */}
                            <Image
                                src="/about-image.jpg"
                                fill
                                alt="Modern Interior"
                                className="object-cover transform hover:scale-110 transition-transform duration-[2s]"
                            />
                            {/* Overlay Gradient: Memberikan efek gelap tipis di bagian bawah gambar agar kontras */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>

                        {/* Floating Experience Card: Elemen dekoratif yang menunjukkan angka statistik (hanya muncul di desktop/tablet) */}
                        <div className="absolute -bottom-10 -left-6 md:left-10 z-20 bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/50 hidden md:block">
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-[#C2A895] text-5xl font-light tracking-tighter">12<span className="text-2xl font-bold italic">Th</span></p>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Dedikasi Layanan</p>
                                </div>
                                {/* Divider/Garis Pemisah Vertikal */}
                                <div className="w-[1px] h-12 bg-slate-200"></div>
                                <div>
                                    <p className="text-slate-900 text-5xl font-light tracking-tighter">100<span className="text-2xl font-bold">+</span></p>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Destinasi Pilihan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sisi Kanan: Narasi/Teks (5 Kolom) */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4">
                            {/* Badge tahun berdiri */}
                            <span className="inline-block px-4 py-1 rounded-full bg-[#C2A895]/10 text-[#C2A895] text-[10px] font-bold uppercase tracking-[0.3em]">
                                Established 2026
                            </span>
                            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] text-slate-900 tracking-tight">
                                Memberikan Pengalaman <br />
                                <span className="italic font-serif text-[#C2A895]">Luar Biasa</span> di Setiap Detik.
                            </h2>
                        </div>

                        <p className="text-slate-500 text-lg leading-relaxed font-light">
                            Kami bukan sekadar platform pemesanan. Kami adalah kurator perjalanan Anda di Lampung, memastikan setiap sudut kamar yang Anda pesan mencerminkan standar kualitas yang kami jaga dengan ketat.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: <IoEyeOutline />,
                                    title: "Visi Global",
                                    desc: "Menjadi standar emas digitalisasi perhotelan di Indonesia."
                                },
                                {
                                    icon: <IoLocateOutline />,
                                    title: "Misi Lokal",
                                    desc: "Memberdayakan akomodasi lokal dengan teknologi kelas dunia."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-[#C2A895] group-hover:bg-[#C2A895] group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 tracking-wide mb-1">{item.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — CORE VALUES (Premium Minimalist) */}
            <section className="bg-[#0A0F1A] py-32 relative">
                <div className="max-w-screen-xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-white text-4xl md:text-5xl font-medium tracking-tight mb-6">
                                Keunggulan yang Kami <br /> <span className="text-[#C2A895] italic font-serif">Tawarkan Untuk Anda</span>
                            </h2>
                            <p className="text-slate-400 font-light">
                                Kami memahami bahwa perjalanan Anda berharga. Oleh karena itu, kami membangun fondasi layanan kami di atas tiga pilar utama.
                            </p>
                        </div>
                        <div className="hidden md:block w-32 h-[1px] bg-[#C2A895]/30 mb-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <IoStarOutline />, title: "Kurasi Premium", desc: "Hanya hotel dengan rating kepuasan di atas 4.5 yang masuk dalam daftar kami." },
                            { icon: <IoShieldCheckmarkOutline />, title: "Keamanan Data", desc: "Protokol enkripsi tingkat bank untuk menjamin privasi identitas dan transaksi Anda." },
                            { icon: <IoTrendingUpOutline />, title: "Jaminan Harga", desc: "Harga transparan langsung dari pemilik properti tanpa biaya admin tambahan." }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-all duration-500">
                                <div className="text-[#C2A895] text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">
                                    {item.icon}
                                </div>
                                <h4 className="text-white group-hover:text-slate-900 text-xl font-bold mb-4 tracking-wide">{item.title}</h4>
                                <p className="text-slate-400 group-hover:text-slate-500 text-sm leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 — MODERN STATS COUNTER */}
            <section className="py-32 bg-white">
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
                        {[
                            { label: "Hotel Terverifikasi", val: "120", suffix: "+" },
                            { label: "Pemesanan Berhasil", val: "15", suffix: "K+" },
                            { label: "Tingkat Kepuasan", val: "99", suffix: "%" },
                            { label: "Dukungan Pelanggan", val: "24", suffix: "/7" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-2 group">
                                <div className="relative inline-block">
                                    <h3 className="text-6xl font-light text-slate-900 tracking-tighter group-hover:text-[#C2A895] transition-colors duration-500">
                                        {stat.val}<span className="text-[#C2A895] text-3xl font-bold">{stat.suffix}</span>
                                    </h3>
                                </div>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
