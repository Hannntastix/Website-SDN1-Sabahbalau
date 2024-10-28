import React from 'react';
import Link from 'next/link';

const Home = () => {
  const schoolInfo = {
    name: "SD Negeri 1 SabahBalau",
    description: "Mendidik generasi masa depan dengan nilai-nilai unggul, kreativitas, dan inovasi. Kami berkomitmen untuk memberikan pendidikan berkualitas yang membentuk karakter siswa.",
    stats: [
      { label: "Siswa Aktif", value: "1,200+" },
      { label: "Guru & Staff", value: "100+" },
      { label: "Program Unggulan", value: "15+" },
      { label: "Prestasi", value: "50+" }
    ],
    facilities: [
      "Ruang Belajar yang layak",
      "Perpustakaan",
      "Lapangan Olahraga",
      "Fasilitas Ekstrakurikuler"
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative h-[500px] bg-gradient-to-r from-green-600 to-green-400">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white space-y-6 max-w-2xl">
            <h1 className='text-4xl font-bold'>Hai, Selamat Datang di</h1>
            <h1 className="text-5xl font-bold">Website {schoolInfo.name}</h1>
            <p className="text-xl">{schoolInfo.description}</p>
            <Link
              href="/configure/quiz"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
            >
              Mulai Kuis Interaktif
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {schoolInfo.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-slate-50 shadow-sm">
                <div className="text-3xl font-bold text-green-600">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fasilitas Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolInfo.facilities.map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <div className="text-green-600 text-xl">✓</div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{facility}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Galeri Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                <img
                  src={`/api/placeholder/800/600`}
                  alt={`Aktivitas Sekolah ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Siap Untuk Mengikuti Kuis?</h2>
          <p className="text-white mb-8 text-lg">Uji pemahaman Anda dengan kuis interaktif kami</p>
          <Link
            href="/configure/quiz"
            className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-lg"
          >
            Mulai Kuis Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Kontak</h3>
              <p>Jl. ... No. 123</p>
              <p>Kota Lampung Selatan, 12345</p>
              <p>Telp: (021) 123-4567</p>
              <p>Email: rehan121203@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
              <p>Senin - Jumat: 07:00 - 15:00</p>
              <p>Sabtu: 07:00 - 12:00</p>
              <p>Minggu: Tutup</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Sosial Media</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p>&copy; 2024 {schoolInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;