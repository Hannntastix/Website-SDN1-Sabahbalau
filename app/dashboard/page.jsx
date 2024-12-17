"use client";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Trash2, Plus, Save } from 'lucide-react';
import { useRouter } from "next/navigation";
import LoadingModal from "../components/ui/LoadingModal";
import NotFound from "../components/NotFound";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function SchoolInfoManagement({
  id,
  name,
  description,
  stats,
  facilities,
  contact,
  operationalHours,
}) {

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newStats, setNewStats] = useState(stats);
  const [newFacilities, setNewFacilities] = useState(facilities);
  const [newContact, setNewContact] = useState(contact);
  const [newOperationalHours, setNewOperationalHours] = useState(operationalHours);
  const [loading, setLoading] = useState(true);
  const [dashboards, setDashboards] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  const { user } = useKindeBrowserClient()

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const res = await fetch(`https://website-sdn-1-sabahbalau.vercel.app/api/dashboard/${id}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error("Failed to fetch information");
        }

        const data = await res.json();
        setDashboards(data.dashboards);
      } catch (error) {
        console.error("Error loading information: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, [id]);

  if (loading) {
    return <LoadingModal />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const handleUpdateStat = (index, field, value) => {
    const updatedStats = [...newStats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };
    setNewStats(updatedStats);
  };

  const handleAddStat = () => {
    setNewStats([...newStats, { label: '', value: '' }]);
  };

  const handleRemoveStat = (index) => {
    const updatedStats = newStats.filter((_, i) => i !== index);
    setNewStats(updatedStats);
  };

  const handleUpdateFacility = (index, value) => {
    const updatedFacilities = [...newFacilities];
    updatedFacilities[index] = value;
    setNewFacilities(updatedFacilities);
  };

  const handleAddFacility = () => {
    setNewFacilities([...newFacilities, '']);
  };

  const handleRemoveFacility = (index) => {
    const updatedFacilities = newFacilities.filter((_, i) => i !== index);
    setNewFacilities(updatedFacilities);
  };

  const handleUpdateContact = (field, value) => {
    setNewContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateOperationalHours = (field, value) => {
    setNewOperationalHours((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/dashboard/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newName,
          newDescription,
          newStats,
          newFacilities,
          newContact,
          newOperationalHours,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan informasi sekolah');
      }

      alert('Informasi sekolah berhasil diperbarui');
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan informasi');
    }
  };

  return (
    <>
      {user ? (
        <div className="p-6 bg-slate-50 min-h-screen">
          <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Manajemen Konten Sekolah</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informasi Dasar Sekolah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Nama Sekolah</label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full"
                    placeholder="Masukkan nama sekolah"
                  />
                </div>
                <div>
                  <label className="block mb-2">Deskripsi Sekolah</label>
                  <Textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full"
                    placeholder="Masukkan deskripsi sekolah"
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
                {newStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block">Label</label>
                    <Input
                      value={stat.label}
                      onChange={(e) => handleUpdateStat(index, 'label', e.target.value)}
                      className="mb-2"
                      placeholder="Contoh: Jumlah Siswa"
                    />
                    <label className="block">Nilai</label>
                    <Input
                      value={stat.value}
                      onChange={(e) => handleUpdateStat(index, 'value', e.target.value)}
                      placeholder="Contoh: 500"
                    />
                    {newStats.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveStat(index)}
                        className="mt-2"
                      >
                        <Trash2 className="mr-2" /> Hapus
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleAddStat}
              >
                <Plus className="mr-2" /> Tambah Statistik
              </Button>
            </CardContent>
          </Card>

          {/* Fasilitas Sekolah */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Fasilitas Sekolah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newFacilities.map((facility, index) => (
                  <div key={index} className="flex space-x-4">
                    <Input
                      value={facility}
                      onChange={(e) => handleUpdateFacility(index, e.target.value)}
                      className="flex-grow"
                      placeholder="Masukkan fasilitas"
                    />
                    {newFacilities.length > 1 && (
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveFacility(index)}
                      >
                        <Trash2 className="mr-2" /> Hapus
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={handleAddFacility}
                >
                  <Plus className="mr-2" /> Tambah Fasilitas
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
                        value={newContact.address}
                        onChange={(e) => handleUpdateContact('address', e.target.value)}
                        className="mt-2"
                        placeholder="Masukkan alamat"
                      />
                    </div>
                    <div>
                      <label>Kota</label>
                      <Input
                        value={newContact.city}
                        onChange={(e) => handleUpdateContact('city', e.target.value)}
                        className="mt-2"
                        placeholder="Masukkan kota"
                      />
                    </div>
                    <div>
                      <label>Telepon</label>
                      <Input
                        value={newContact.phone}
                        onChange={(e) => handleUpdateContact('phone', e.target.value)}
                        className="mt-2"
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <Input
                        value={newContact.email}
                        onChange={(e) => handleUpdateContact('email', e.target.value)}
                        className="mt-2"
                        placeholder="Masukkan email"
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
                        value={newOperationalHours.weekdays}
                        onChange={(e) => handleUpdateOperationalHours('weekdays', e.target.value)}
                        className="mt-2"
                        placeholder="Contoh: 08.00 - 16.00"
                      />
                    </div>
                    <div>
                      <label>Sabtu</label>
                      <Input
                        value={newOperationalHours.saturday}
                        onChange={(e) => handleUpdateOperationalHours('saturday', e.target.value)}
                        className="mt-2"
                        placeholder="Contoh: 08.00 - 12.00"
                      />
                    </div>
                    <div>
                      <label>Minggu</label>
                      <Input
                        value={newOperationalHours.sunday}
                        onChange={(e) => handleUpdateOperationalHours('sunday', e.target.value)}
                        className="mt-2"
                        placeholder="Contoh: Tutup"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Button
              onClick={handleSubmit}
              className="inline-flex items-center"
            >
              <Save className="mr-2" /> Simpan Perubahan
            </Button>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}