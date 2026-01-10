import { Metadata } from "next"
import HeaderSection from "@/components/header-setion"
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Tentang Kami | Hotel Bandar Lampung",
    description: "Online Booking Hotel Bandar Lampung",
}

const AboutPage = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
            <HeaderSection
                title="Tentang Kami"
                subtitle="Platform booking hotel yang aman, cepat, dan terpercaya di wilayah Lampung."
            />

            <div className="max-w-screen-xl mx-auto py-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

                    {/* Image Section */}
                    <div className="relative">
                        <Image
                            src="/about-image.jpg"
                            width={650}
                            height={579}
                            alt="Tentang Kami"
                            className="rounded-3xl shadow-xl object-cover w-full"
                        />

                        {/* Badge */}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-5 py-3 rounded-xl shadow">
                            <p className="text-xs text-gray-500">Dipercaya Traveler</p>
                            <p className="text-base font-semibold text-gray-900">
                                100+ Hotel
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div>
                        <span className="inline-block mb-3 text-sm uppercase tracking-widest text-[#C9A24D] font-semibold">
                            Tentang Platform
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            Solusi Booking Hotel <br className="hidden sm:block" />
                            Terbaik di Lampung
                        </h1>

                        <p className="text-gray-600 leading-relaxed text-justify">
                            Kami adalah platform pemesanan hotel yang berfokus pada penyediaan
                            akomodasi terbaik di seluruh Provinsi Lampung. Dengan jaringan hotel
                            yang luas, kami membantu traveler menemukan tempat menginap yang nyaman,
                            sesuai kebutuhan, dan dengan harga terbaik.
                        </p>

                        {/* Visi & Misi */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">

                            {/* Visi */}
                            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <IoEyeOutline className="size-6" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        Visi
                                    </h4>
                                </div>
                                <p className="text-gray-600 text-justify">
                                    Menjadi platform booking hotel nomor satu di Lampung dengan
                                    pengalaman menginap yang mudah, cepat, dan memuaskan.
                                </p>
                            </div>

                            {/* Misi */}
                            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <IoLocateOutline className="size-6" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        Misi
                                    </h4>
                                </div>
                                <p className="text-gray-600 text-justify">
                                    Menyediakan akses mudah dan cepat untuk memesan berbagai
                                    pilihan hotel di Lampung dengan informasi transparan dan
                                    pelayanan terpercaya.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
