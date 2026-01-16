import React from "react";
// Import icon dari library Lucide React untuk representasi visual yang minimalis dan modern
import {
  MessageSquare,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  CreditCard,
  Send,
  Globe
} from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Dekorasi Background: Menggunakan efek blur transparan agar terlihat modern/premium */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#C2A895]/5 blur-[120px] rounded-full -z-10"></div>

        <span className="inline-block mb-4 text-[10px] uppercase tracking-[0.4em] text-[#C2A895] font-bold">
          Get in Touch
        </span>
        <h1 className="relative text-4xl md:text-6xl font-light tracking-tight mb-6">
          Hubungi <span className="italic font-serif text-[#C2A895]">Kami</span>
        </h1>
        <p className="relative text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
          Kami siap membantu Anda menemukan pengalaman menginap terbaik dengan layanan profesional dan responsif khusus untuk wilayah Lampung.
        </p>
      </section>

      {/* CONTENT GRID: Membagi halaman menjadi 12 kolom (Desktop)
          lg:grid-cols-12 digunakan untuk pembagian porsi kiri (5) dan kanan (7)
      */}
      <main className="max-w-6xl mx-auto px-6 pb-32 grid lg:grid-cols-12 gap-16 items-start">

        {/* LEFT COLUMN (Info) */}
        <div className="lg:col-span-5 space-y-12">

          {/* HEADQUARTERS CARD */}
          <div className="group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#C2A895] border border-slate-100">
                <Globe size={20} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Pusat Informasi</h3>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 hover:border-[#C2A895]/30 transition-all duration-500">
              <h4 className="font-bold text-xl mb-3 text-slate-900 font-serif italic">Lampung Hotel Group</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Platform reservasi akomodasi digital terintegrasi yang melayani kebutuhan menginap di seluruh Kabupaten/Kota Provinsi Lampung.
              </p>
              <div className="mt-6 flex items-center gap-3 text-[#C2A895] text-sm font-medium">
                <MapPin size={16} />
                <span>Bandar Lampung, Indonesia</span>
              </div>
            </div>
          </div>

          {/* SOCIALS: Iterasi data menggunakan .map() untuk efisiensi kode (DRY Principle) */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 px-2">Saluran Reservasi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "WhatsApp", val: "+62 812 3456 7890", icon: <Phone size={18} />, color: "hover:text-emerald-500" },
                { label: "Instagram", val: "@lampunghotel", icon: <Instagram size={18} />, color: "hover:text-pink-500" },
                { label: "X / Twitter", val: "@lampunghotel", icon: <Twitter size={18} />, color: "hover:text-sky-500" },
                { label: "Facebook", val: "Lampung Hotel", icon: <Facebook size={18} />, color: "hover:text-blue-600" },
              ].map((item, i) => (
                // Iterasi data menggunakan .map()
                <div key={i} className={`group flex items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ${item.color} hover:shadow-md cursor-pointer`}>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-700">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT POLICY: Kartu bertema gelap (Dark Mode) untuk memberikan variasi visual */}
          <div className="p-8 bg-[#0A0F1A] rounded-[2rem] text-white relative overflow-hidden">
            {/* Background Icon: Diposisikan absolut dan diputar (rotate) sebagai elemen estetika */}
            <CreditCard className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#C2A895] mb-4">Kebijakan Pembayaran</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Keamanan transaksi adalah prioritas kami. Seluruh proses pembayaran dilakukan secara transparan melalui mitra perbankan resmi atau dompet digital terverifikasi.
            </p>
          </div>
        </div>

        {/* KOLOM KIRI: Informasi Kontak & Sosial Media (5 Kolom) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2A895]/5 rounded-bl-full"></div>

            <div className="relative mb-10">
              <h3 className="text-2xl font-medium text-slate-900 mb-2">Kirim Pesan Langsung</h3>
              <p className="text-slate-400 text-sm font-light">Admin kami akan merespon pesan Anda dalam waktu maksimal 24 jam.</p>
            </div>

            <form className="relative space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama..."
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-[#C2A895]/20 outline-none transition border border-transparent focus:border-[#C2A895]/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Alamat Email</label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-[#C2A895]/20 outline-none transition border border-transparent focus:border-[#C2A895]/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Pesan Anda</label>
                <textarea
                  rows={5}
                  placeholder="Ceritakan apa yang bisa kami bantu..."
                  className="w-full bg-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-[#C2A895]/20 outline-none transition border border-transparent focus:border-[#C2A895]/30 resize-none"
                />
              </div>

              {/* Tombol Submit dengan efek hover warna brand dan active scaling */}
              <button className="w-full bg-[#0A0F1A] hover:bg-[#C2A895] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-3">
                <Send size={16} />
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
