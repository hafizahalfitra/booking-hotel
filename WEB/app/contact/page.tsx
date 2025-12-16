import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      

      {/* --- HERO SECTION --- */}
      <section className="bg-gray-50 py-16 px-6 text-center border-b">
        <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-4">Hubungi Kami </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan akomodasi terbaik dengan harga terjangkau untuk kenyamanan menginap Anda. 
        </p>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-16">
        
        {/* Kolom Kiri: Informasi Hotel & Sosial Media */}
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4 uppercase">Lokasi Kami</h3>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-hover hover:shadow-xl">
              <h4 className="text-xl font-bold text-gray-900 mb-2">ASTON Lampung Hotel </h4>
              <p className="text-gray-600 mb-6 flex items-start text-sm">
                <span className="mr-2">📍</span>
                Jl. Wolter Monginsidi No.175, Gedong Meneng 
              </p>
            </div>
          </div>

          {/* BAGIAN BARU: SOSIAL MEDIA & KONTAK */}
          <div>
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4 uppercase">Social Media & Reservasi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <a href="https://wa.me/6281234567890" target="_blank" className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition border border-green-200">
                <div className="bg-green-500 text-white p-2 rounded-lg mr-3 italic font-black">WA</div>
                <div>
                  <p className="text-xs text-green-700 font-bold uppercase">WhatsApp</p>
                  <p className="text-sm font-semibold text-gray-800">+62 812-3456-7890</p>
                </div>
              </a>
              
              {/* Instagram */}
              <a href="#" className="flex items-center p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition border border-pink-200">
                <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-2 rounded-lg mr-3 font-bold">IG</div>
                <div>
                  <p className="text-xs text-pink-700 font-bold uppercase">Instagram</p>
                  <p className="text-sm font-semibold text-gray-800">@astonlampunghotel</p>
                </div>
              </a>

              {/* X (Twitter) */}
              <a href="#" className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-200 transition border border-gray-300">
                <div className="bg-black text-white p-2 px-3 rounded-lg mr-3 font-bold font-mono">X</div>
                <div>
                  <p className="text-xs text-gray-700 font-bold uppercase">X Account</p>
                  <p className="text-sm font-semibold text-gray-800">@astonlampung</p>
                </div>
              </a>

              {/* Traveloka */}
              <a href="#" className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition border border-blue-200">
                <div className="bg-blue-500 text-white p-2 rounded-lg mr-3 font-bold italic">T</div>
                <div>
                  <p className="text-xs text-blue-700 font-bold uppercase">Traveloka</p>
                  <p className="text-sm font-semibold text-gray-800 text-blue-600 underline">Book via App</p>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Metode Pembayaran </h3>
            <p className="text-gray-600 leading-relaxed">
              Kami menerima berbagai metode pembayaran mulai dari transfer bank hingga dompet digital untuk memudahkan proses reservasi Anda.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Form Kontak */}
        <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl h-fit">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Kirim Pesan</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nama Anda</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition" 
                placeholder="Nama Lengkap" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-gray-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition" 
                placeholder="nama@email.com" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Pesan</label>
              <textarea 
                rows={4} 
                className="w-full bg-gray-800 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition" 
                placeholder="Bagaimana kami bisa membantu Anda?"
              ></textarea>
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg transition-all active:scale-95">
              Kirim Pesan Sekarang 
            </button>
          </form>
        </div>
      </main>

    </div>
  );
};

export default ContactPage;