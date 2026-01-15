import { Metadata } from "next"
import HeaderSection from "@/components/header-setion"
import { IoEyeOutline, IoLocateOutline, IoStarOutline, IoShieldCheckmarkOutline, IoTrendingUpOutline, IoHeadsetOutline } from "react-icons/io5"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Tentang Kami | Hotel Bandar Lampung",
    description: "Online Booking Hotel Bandar Lampung",
}

const AboutPage = () => {
    return (
        <div className="bg-white text-slate-900">
            <HeaderSection
                title="Tentang Kami"
                subtitle="Membangun standar baru dalam pemesanan akomodasi eksklusif di jantung Lampung."
            />

            {/* SECTION 1 — PROFIL & NARASI */}
            <section className="max-w-screen-xl mx-auto py-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Composition */}
                    <div className="relative group">
                        <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border border-[#C9A24D]/30 rounded-[2rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                            <Image
                                src="/about-image.jpg"
                                width={800}
                                height={900}
                                alt="Tentang Kami"
                                className="object-cover w-full h-auto transform hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Floating Experience Card */}
                        <div className="absolute -bottom-8 -right-4 md:right-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 animate-pulse">
                            <p className="text-[#C9A24D] text-4xl font-serif italic leading-none">100+</p>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-2">Mitra Terpercaya</p>
                        </div>
                    </div>

                    {/* Narrative Content */}
                    <div className="space-y-8">
                        <div>
                            <p className="text-[#C9A24D] font-bold tracking-[0.3em] uppercase text-sm mb-4">The Gateway to Lampung</p>
                            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight italic">
                                Pengalaman Menginap <br />
                                <span className="not-italic text-slate-900">Tanpa Batas.</span>
                            </h2>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed font-light">
                            Kami hadir sebagai kurator akomodasi digital terdepan di Lampung. Melalui dedikasi tinggi, kami menghubungkan Anda dengan pilihan hotel terbaik yang menggabungkan kenyamanan modern dengan keramahan khas lokal.
                        </p>

                        {/* Visi & Misi with minimalist look */}
                        <div className="grid grid-cols-1 gap-4 pt-4">
                            <div className="flex gap-5 p-6 rounded-3xl bg-slate-50 border border-transparent hover:border-[#C9A24D]/20 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#C9A24D]/10 text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-white transition-colors">
                                    <IoEyeOutline size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Visi Global</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Menjadi lokomotif utama digitalisasi pariwisata Lampung dengan standar layanan internasional.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 p-6 rounded-3xl bg-slate-50 border border-transparent hover:border-[#C9A24D]/20 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#C9A24D]/10 text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-white transition-colors">
                                    <IoLocateOutline size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Misi Terukur</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">Menyediakan akses reservasi yang transparan, aman, dan efisien bagi setiap pelancong.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — CORE VALUES (Premium Dark Section) */}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                <div className="max-w-screen-xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-[#C9A24D] text-3xl md:text-5xl font-serif italic mb-4">Mengapa Memilih Kami?</h2>
                        <div className="w-24 h-[1px] bg-[#C9A24D]/50 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <IoStarOutline />, title: "Kurasi Ketat", desc: "Setiap hotel mitra kami melewati proses verifikasi standar kenyamanan yang komprehensif." },
                            { icon: <IoShieldCheckmarkOutline />, title: "Privasi Mutlak", desc: "Data Anda dienkripsi dengan teknologi keamanan tingkat tinggi di setiap transaksi." },
                            { icon: <IoTrendingUpOutline />, title: "Harga Kompetitif", desc: "Dapatkan penawaran harga terbaik yang transparan tanpa ada biaya tersembunyi." }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-[2rem] border border-slate-800 bg-slate-800/30 backdrop-blur-sm hover:bg-white transition-all duration-500">
                                <div className="text-[#C9A24D] text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="text-white group-hover:text-slate-900 text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3 — MINIMALIST STATS */}
            <section className="py-24 bg-white">
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: "Hotel Aktif", val: "100+" },
                            { label: "Sukses Booking", val: "1k+" },
                            { label: "Review Positif", val: "98%" },
                            { label: "Layanan CS", val: "24/7" }
                        ].map((stat, i) => (
                            <div key={i} className="group">
                                <h3 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter group-hover:text-[#C9A24D] transition-colors">{stat.val}</h3>
                                <div className="h-0.5 w-8 bg-[#C9A24D] mx-auto mb-3 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage