"use client"

import React, { useEffect, useState } from 'react';
import { getSchoolInfo } from '../utlis/localStorage';
import { defaultSchoolInfo } from './components/DefaultSchoolInfo';
import Link from 'next/link';
import LoadingModal from './components/ui/LoadingModal';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import LoginModal from './components/ui/LoginModal';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [schoolInfo, setSchoolInfo] = useState(defaultSchoolInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useKindeBrowserClient();

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
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-600 ">Galeri Sekolah</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                <img
                  src={`/assets/school_galeri1.jpg`}
                  alt={`Aktivitas Sekolah ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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