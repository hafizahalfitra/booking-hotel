import Image from "next/image"
import Link from "next/link"
const Hero = () => {
    return (
        <div className="relative h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                <Image src="/hero.jpg" alt="heroimage" fill className="object-cover object-center
                w-full h-full"/>
                <div className="absolute inset-0 bg-black opacity-50"></div>

            </div>
            <div className="relative flex flex-col justify-center items-center h-full text-center">
                <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">Pesan Kamar
                    Mewah Anda</h1>
                <p className="text-xl text-gray-300 mb-8">Dapatkan Penawaran Spesial Hanya Untuk Anda Hari Ini.</p>
                <div className="flex gap-5">
                    <Link href="/room" className="bg-[#C2A895] text-white hover:bg-[#b39683]
                    py-2.5 px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg"
                    >
                        Pesan Sekarang
                        
                    </Link>

                    <Link 
                    href="/contact" 
                    className="bg-transparent border border-[#C2A895] text-white hover:bg-[#b39683]
                    py-2.5 px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg"
                    >Hubungi kami</Link>

                </div>
            </div>
            Hero</div>
    )
}

export default Hero
