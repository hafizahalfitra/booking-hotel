// app/page.tsx
import Hero from "@/components/hero";
import Main from "@/components/main";

export default function Home() {
  return (
    <div className="bg-[#f7f4f1]">
      <Hero />

      <section className="max-w-screen-xl mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          {/* <span className="inline-block mb-3 text-sm uppercase tracking-widest text-[#C2A895] font-semibold">
            Premium Hotel
          </span> */}

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Kamar & Harga
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Pilihan kamar eksklusif dengan desain elegan dan kenyamanan maksimal
            untuk pengalaman menginap yang berkelas.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16">
          <Main />
        </div>
      </section>
    </div>
  );
}
