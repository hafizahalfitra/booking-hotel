// app/page.tsx
import Hero from "@/components/hero";
import Main from "@/components/main";

export default function Home() {
  return (
    <div className="bg-[#FAF9F6]">
      <Hero />

      {/* Content Section Wrapper */}
      <section className="relative max-w-screen-xl mx-auto px-6 py-32">
        
        {/* Leading Line Decoration */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#C2A895] to-transparent opacity-40"></div>

        {/* Leading Line Decoration */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#C2A895] to-transparent opacity-40"></div>

        {/* Header Section */}
<div className="text-center max-w-3xl mx-auto mb-20">
          
          {/* Eyebrow Text */}
          <span className="inline-block mb-6 text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C2A895] font-bold border-b border-[#C2A895]/30 pb-2">
            Luxury Accommodations
          </span>

          {/* Main Heading with Mixed Typography */}
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
            Kamar & <span className="italic font-serif text-[#C2A895]">Harga Terbaik</span>
          </h1>

          {/* Description with Decorative Lines */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-slate-200"></div>
            
            <p className="text-slate-500 font-light max-w-md leading-relaxed text-sm md:text-base">
              Setiap sudut ruang dirancang dengan sentuhan modern yang estetis dan kenyamanan yang tak tertandingi.            
            </p>

            <div className="h-[1px] w-8 bg-slate-200"></div>
          </div>
        </div>

        {/* List Kamar/Hotel */}
        <div className="relative z-10 transition-all duration-700 ease-in-out">
          <Main />
        </div>

        {/* Background Accent */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C2A895]/5 rounded-full blur-[100px] -z-10"></div>
      </section>
    </div>
  );
}