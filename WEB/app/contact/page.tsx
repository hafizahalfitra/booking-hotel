import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">

      {/* HERO */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 blur-3xl"></div>
        <h1 className="relative text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Hubungi <span className="text-[#C9A24D]">Kami</span>
        </h1>
        <p className="relative text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Kami siap membantu Anda menemukan pengalaman menginap terbaik dengan layanan profesional dan responsif
          Khusus wilayah Bandar Lampung.
        </p>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-12">

          {/* LOCATION */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-5 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#C9A24D] rounded-full"></span>
              Lokasi Kami
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-lg mb-2">Lampung Hotel</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Jl. Raden Intan No.88, Pelita, Kota Bandar Lampung, Lampung 35118
              </p>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-5 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#C9A24D] rounded-full"></span>
              Sosial Media & Reservasi
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "WhatsApp",
                  value: "+62 812-3456-7890",
                  bg: "bg-green-50 hover:bg-green-100",
                  badge: "bg-green-500",
                },
                {
                  label: "Instagram",
                  value: "@lampunghotel",
                  bg: "bg-pink-50 hover:bg-pink-100",
                  badge: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500",
                },
                {
                  label: "X / Twitter",
                  value: "@lampunghotel",
                  bg: "bg-gray-100 hover:bg-gray-200",
                  badge: "bg-black",
                },
                {
                  label: "Facebook",
                  value: "Lampung Hotel",
                  bg: "bg-blue-50 hover:bg-blue-100",
                  badge: "bg-[#1877F2]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center p-4 rounded-xl border transition cursor-pointer ${item.bg}`}
                >
                  <div className={`${item.badge} text-white px-3 py-2 rounded-lg mr-3 text-sm font-bold w-10 h-10 flex items-center justify-center`}>
                    {item.label[0]}
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-gray-500">{item.label}</p>
                    <p className="text-sm font-bold text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wide mb-4">
              Metode Pembayaran
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kami menerima transfer bank dan dompet digital untuk memastikan proses reservasi yang mudah dan aman.
            </p>
          </div>
        </div>

        {/* RIGHT – FORM */}
        <div className="relative bg-gray-900 rounded-3xl p-10 shadow-2xl text-white">
          <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-3xl"></div>

          <h3 className="relative text-2xl font-bold uppercase tracking-wide mb-8">
            Kirim Pesan
          </h3>

          <form className="relative space-y-6">
            {[
              { label: "Nama Anda", type: "text", placeholder: "Nama Lengkap" },
              { label: "Email", type: "email", placeholder: "nama@email.com" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C9A24D] outline-none transition border border-gray-700"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                Pesan
              </label>
              <textarea
                rows={4}
                placeholder="Bagaimana kami bisa membantu Anda?"
                className="w-full bg-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C9A24D] outline-none transition border border-gray-700"
              />
            </div>

            <button className="w-full bg-[#C9A24D] hover:bg-[#B08C3C] py-4 rounded-xl font-bold uppercase tracking-widest transition active:scale-95 shadow-lg">
              Kirim Pesan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;