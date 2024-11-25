"use client"

import React, { useEffect, useState } from 'react';
import { getSchoolInfo } from '../utlis/localStorage';
import { defaultSchoolInfo } from './components/DefaultSchoolInfo';
import LoadingModal from './components/ui/LoadingModal';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import LoginModal from './components/ui/LoginModal';
import dynamic from 'next/dynamic';

const Home = () => {
  const [schoolInfo, setSchoolInfo] = useState(defaultSchoolInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useKindeBrowserClient();

  const Map = dynamic(() => import('./components/MyMap'), {
    ssr: false,
    loading: () => (
      <div className='h-[500px] w-[80%] mx-auto bg-gray-100 animate-pulse flex items-center justify-center'>
        Loading Map...
      </div>
    )
  });

  const router = useRouter();

  const handleNavigate = () => {
    if (user) {
      router.push('/configure/quiz')
    } else {
      setIsModalOpen(true)
    }
  }

  const fetchSchoolInfo = async () => {
    try {
      const savedInfo = await getSchoolInfo();
      setSchoolInfo(savedInfo);
    } catch (err) {
      setError("Gagal memuat data sekolah.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSchoolInfo();
  }, []);


  if (loading) {
    return <LoadingModal />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* bg-gradient-to-r from-green-600 to-green-400 */}
      <section className="bg-white py-16 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-zinc-600 space-y-6">
              <h1 className="text-blue-700 text-3xl xl:text-4xl md:text-left text-center font-bold">
                Hai, Selamat Datang di
              </h1>
              <h2 className="text-blue-500 text-4xl md:text-left text-center xl:text-5xl font-bold">
                Website {schoolInfo.name}
              </h2>
              <p className="text-lg sm:text-xl md:text-left text-center leading-relaxed">
                {schoolInfo.description}
              </p>
              <div className="pt-4 md:text-left text-center">
                <button
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors shadow-lg"
                  onClick={() => handleNavigate()}
                >
                  Halaman Daftar Soal
                </button>
              </div>
            </div>

            <LoginModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

            {/* Image */}
            <div className="hidden md:flex justify-center lg:justify-end">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/study-3d-icon-download-in-png-blend-fbx-gltf-file-formats--reading-writing-read-education-school-pack-university-icons-8944449.png?f=webp"
                alt="Study Illustration"
                className="w-4/5 lg:w-[70%] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {schoolInfo.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-slate-50 shadow-sm">
                <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                <div className="text-blue-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-zinc-600 font-bold text-center mb-12">Fasilitas Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolInfo.facilities.map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
        <div className="max-w-7xl mx-auto md:px-4 px-2">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-600 ">Galeri Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="max-w-max mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/assets/school_galeri1.jpg"
                  alt="Gambar 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Ruangan Kelas Yang Layak
                </span>
              </div>
            </div>

            <div className="max-w-max mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/assets/school_galeri2.jpg"
                  alt="Gambar 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Lapangan Sekolah Serbaguna
                </span>
              </div>
            </div>
            <div className="max-w-max mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/assets/school_galeri3.jpg"
                  alt="Gambar 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Kantin Sekolah
                </span>
              </div>
            </div>
            <div className="max-w-max mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/assets/school_galeri4.jpg"
                  alt="Gambar 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Perpustakaan
                </span>
              </div>
            </div>
            <div className="max-w-max mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/assets/school_galeri5.jpg"
                  alt="Gambar 5"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Musholla Sekolah
                </span>
              </div>
            </div>
            <div className="max-w-max mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/assets/school_galeri6.jpg"
                  alt="Gambar 6"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center mt-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Prestasi Anak Murid SDN 1 Sabahbalau
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="my-10 flex flex-col justify-center items-center mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-xl text-center">
          <h1 className="font-extrabold text-4xl text-white mb-4 tracking-wide">
            Lokasi SDN 1 SabahBalau
          </h1>
          <p className="text-white text-sm opacity-90">
            Temukan lokasi sekolah dengan mudah melalui peta interaktif di bawah ini.
          </p>
        </div>
        <div className="mt-8 w-full max-w-3xl">
          <Map />
        </div>
      </div>



      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 mb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Siap Untuk Mengerjakan Latihan Soal?</h2>
          <p className="text-white mb-8 text-lg">Uji pemahamanmu dengan mengerjakan latihan soal yang berkualitas.</p>
          <button
            className="inline-block bg-white text-blue-500 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            onClick={() => handleNavigate()}
          >
            Halaman Daftar Soal
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Kontak</h3>
              <p>Jl. Jl. M. Azizy, Sabah Balau, Kec. Tj. Bintang</p>
              <p>Kota Lampung Selatan, 35365</p>
              <p>Telp: (+62)85810355240</p>
              <p>Email: sdn1sabahbalau@yahoo.co.id</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
              <p>Senin - Jumat: 07:00 - 13:00</p>
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
            <p>&copy; 2024 {schoolInfo.name}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;