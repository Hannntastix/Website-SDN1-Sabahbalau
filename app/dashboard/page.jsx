"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';



const SchoolWebsiteDashboard = () => {

  const handleSubmit = () => {
    alert("Perubahan Berhasil disimpan")
  }

  const [schoolInfo, setSchoolInfo] = useState({
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
    ],
    contact: {
      address: "Jl. ... No. 123",
      city: "Kota Lampung Selatan, 12345",
      phone: "(021) 123-4567",
      email: "rehan121203@gmail.com"
    },
    operationalHours: {
      weekdays: "Senin - Jumat: 07:00 - 15:00",
      saturday: "Sabtu: 07:00 - 12:00",
      sunday: "Minggu: Tutup"
    }
  });

  const handleUpdateName = (e) => {
    setSchoolInfo(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleUpdateDescription = (e) => {
    setSchoolInfo(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const handleUpdateStat = (index, field, value) => {
    const newStats = [...schoolInfo.stats];
    newStats[index][field] = value;
    setSchoolInfo(prev => ({
      ...prev,
      stats: newStats
    }));
  };

  const handleUpdateFacility = (index, value) => {
    const newFacilities = [...schoolInfo.facilities];
    newFacilities[index] = value;
    setSchoolInfo(prev => ({
      ...prev,
      facilities: newFacilities
    }));
  };

  const handleAddFacility = () => {
    setSchoolInfo(prev => ({
      ...prev,
      facilities: [...prev.facilities, "Fasilitas Baru"]
    }));
  };

  const handleUpdateContact = (field, value) => {
    setSchoolInfo(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleUpdateOperationalHours = (field, value) => {
    setSchoolInfo(prev => ({
      ...prev,
      operationalHours: {
        ...prev.operationalHours,
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dasbor Manajemen Konten Sekolah</h1>

      {/* Informasi Dasar Sekolah */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informasi Dasar Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Nama Sekolah</label>
              <Input
                value={schoolInfo.name}
                onChange={handleUpdateName}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Deskripsi Sekolah</label>
              <Textarea
                value={schoolInfo.description}
                onChange={handleUpdateDescription}
                className="w-full"
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistik Sekolah */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Statistik Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {schoolInfo.stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <label className="block">Label</label>
                <Input
                  value={stat.label}
                  onChange={(e) => handleUpdateStat(index, 'label', e.target.value)}
                  className="mb-2"
                />
                <label className="block">Nilai</label>
                <Input
                  value={stat.value}
                  onChange={(e) => handleUpdateStat(index, 'value', e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fasilitas Sekolah */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Fasilitas Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schoolInfo.facilities.map((facility, index) => (
              <div key={index} className="flex space-x-4">
                <Input
                  value={facility}
                  onChange={(e) => handleUpdateFacility(index, e.target.value)}
                  className="flex-grow"
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    const newFacilities = schoolInfo.facilities.filter((_, i) => i !== index);
                    setSchoolInfo(prev => ({
                      ...prev,
                      facilities: newFacilities
                    }));
                  }}
                >
                  Hapus
                </Button>
              </div>
            ))}
            <Button onClick={handleAddFacility}>
              Tambah Fasilitas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kontak dan Jam Operasional */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Kontak dan Jam Operasional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
              <div className="space-y-4">
                <div>
                  <label>Alamat</label>
                  <Input
                    value={schoolInfo.contact.address}
                    onChange={(e) => handleUpdateContact('address', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label>Kota</label>
                  <Input
                    value={schoolInfo.contact.city}
                    onChange={(e) => handleUpdateContact('city', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label>Telepon</label>
                  <Input
                    value={schoolInfo.contact.phone}
                    onChange={(e) => handleUpdateContact('phone', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    value={schoolInfo.contact.email}
                    onChange={(e) => handleUpdateContact('email', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
              <div className="space-y-4">
                <div>
                  <label>Senin - Jumat</label>
                  <Input
                    value={schoolInfo.operationalHours.weekdays}
                    onChange={(e) => handleUpdateOperationalHours('weekdays', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label>Sabtu</label>
                  <Input
                    value={schoolInfo.operationalHours.saturday}
                    onChange={(e) => handleUpdateOperationalHours('saturday', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label>Minggu</label>
                  <Input
                    value={schoolInfo.operationalHours.sunday}
                    onChange={(e) => handleUpdateOperationalHours('sunday', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Perubahan */}
      <Card>
        <CardHeader>
          <CardTitle>Pratinjau Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(schoolInfo, null, 2)}
          </pre>
        </CardContent>
      </Card>
      <div className="text-center mt-6">
        <Link
          onClick={handleSubmit}
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
        >
          Simpan Perubahan
        </Link>
      </div>
    </div>
  );
};

export default SchoolWebsiteDashboard;