// app/page.tsx
import Hero from "@/components/hero";
import Main from "@/components/main";

export default function Home() {
  return (
    // Container Utama
    // Menggunakan warna bg-[#FAF9F6] (Off-White/Alabaster) alih-alih putih murni
    // untuk mengurangi ketegangan mata dan memberikan kesan lebih 'warm' & premium.
    <div className="bg-[#FAF9F6]"> {/* Warna background lebih bersih & premium */}

      // Hero Section: Komponen banner utama di paling ata
      <Hero />

      // Content Section Wrapper
      // 'relative' diperlukan agar elemen dekorasi 'absolute' di dalamnya 
          bisa memposisikan diri relatif terhadap section ini, bukan body
      <section className="relative max-w-screen-xl mx-auto px-6 py-32">
        
        /* --- DEKORASI VISUAL (Aesthetic Elements) --- */

        // Vertical Line Gradient: Garis tipis vertikal di tengah atas
        // Fungsinya sebagai "Leading Line" untuk memandu mata user dari Hero ke konten di bawahnya
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#C2A895] to-transparent opacity-40"></div>

        /* --- HEADER TEXT SECTION --- */
        <div className="text-center max-w-3xl mx-auto mb-20">

          // Eyebrow Text / Kicker: Teks kecil di atas judul utama
          // tracking-[0.4em] membuat huruf sangat renggang, ciri khas desain mewah
          <span className="inline-block mb-6 text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C2A895] font-bold border-b border-[#C2A895]/30 pb-2">
            Luxury Accommodations
          </span>

          //  Main Heading
          // Teknik 'Mixed Typography': Menggabungkan font Sans-Serif (Modern) 
              dengan Serif Italic (Klasik/Elegan) pada kata "Harga Terbaik"
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
            Kamar & <span className="italic font-serif text-[#C2A895]">Harga Terbaik</span>
          </h1>

          // Description dengan Separator Lines
          <div className="mt-8 flex items-center justify-center gap-4">
            // Garis dekoratif kiri
            <div className="h-[1px] w-8 bg-slate-200"></div>
            
            <p className="text-slate-500 font-light max-w-md leading-relaxed text-sm md:text-base">
              Setiap sudut ruang dirancang dengan sentuhan modern yang estetis dan kenyamanan yang tak tertandingi.            
            </p>

            // Garis dekoratif kanan
            <div className="h-[1px] w-8 bg-slate-200"></div>
          </div>
        </div>

        // --- MAIN CONTENT (List Kamar/Hotel) ---
        // z-10 memastikan konten ini bisa diklik dan berada DI ATAS elemen dekorasi background
        <div className="relative z-10 transition-all duration-700 ease-in-out">
          <Main />
        </div>

        // Dekorasi Background Tambahan (Modern Shape) 
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C2A895]/5 rounded-full blur-[100px] -z-10"></div>
      </section>
    </div>
  );
}
