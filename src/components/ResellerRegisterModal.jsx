import React, { useState, useEffect } from 'react';

// Komponen untuk modal pendaftaran Reseller (versi lengkap)
export default function ResellerRegisterModal({ isOpen, onClose, onRegistrationSuccess, openMessageModal }) {
    // State untuk data alamat dari API
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    // State untuk menyimpan pilihan pengguna
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // State untuk checkbox pernyataan
    const [agreeData, setAgreeData] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Efek untuk mengambil data provinsi saat modal dibuka
    useEffect(() => {
        if (isOpen) {
            fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
                .then(response => response.json())
                .then(data => setProvinces(data))
                .catch(err => openMessageModal('Kesalahan API', "Gagal mengambil data provinsi."));
        }
    }, [isOpen, openMessageModal]);

    // Efek untuk mengambil data kabupaten/kota saat provinsi dipilih
    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
                .then(response => response.json())
                .then(data => {
                    setRegencies(data);
                    setDistricts([]);
                    setVillages([]);
                })
                .catch(err => openMessageModal('Kesalahan API', "Gagal mengambil data kabupaten/kota."));
        }
    }, [selectedProvince, openMessageModal]);

    // Efek untuk mengambil data kecamatan saat kabupaten/kota dipilih
    useEffect(() => {
        if (selectedRegency) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
                .then(response => response.json())
                .then(data => {
                    setDistricts(data);
                    setVillages([]);
                })
                .catch(err => openMessageModal('Kesalahan API', "Gagal mengambil data kecamatan."));
        }
    }, [selectedRegency, openMessageModal]);
    
    // Efek untuk mengambil data kelurahan saat kecamatan dipilih
    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
                .then(response => response.json())
                .then(data => setVillages(data))
                .catch(err => openMessageModal('Kesalahan API', "Gagal mengambil data kelurahan."));
        }
    }, [selectedDistrict, openMessageModal]);

    if (!isOpen) return null;

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const resellerData = Object.fromEntries(formData.entries());
        
        onRegistrationSuccess(resellerData);
        openMessageModal('Pendaftaran Berhasil', 'Pendaftaran sebagai Reseller berhasil!');
    };

    const isSubmitDisabled = !agreeData || !agreeTerms;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Daftar sebagai Reseller</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Kolom Kiri */}
                            <div className="space-y-4">
                                <input name="resellerName" type="text" placeholder="Nama Lengkap" className="w-full p-2.5 border rounded-md" required />
                                <input name="whatsapp" type="tel" placeholder="No. Whatsapp Aktif" className="w-full p-2.5 border rounded-md" required />
                                <textarea name="address" placeholder="Alamat Lengkap" rows="3" className="w-full p-2.5 border rounded-md" required></textarea>
                                <input name="postalCode" type="text" placeholder="Kode Pos" className="w-full p-2.5 border rounded-md" required />
                            </div>
                            {/* Kolom Kanan */}
                            <div className="space-y-4">
                                <select onChange={(e) => setSelectedProvince(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" required>
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <select onChange={(e) => setSelectedRegency(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedProvince} required>
                                    <option value="">Pilih Kota/Kabupaten</option>
                                    {regencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                                <select onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedRegency} required>
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                                <select name="village" className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedDistrict} required>
                                    <option value="">Pilih Kelurahan</option>
                                    {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Pernyataan Checkbox */}
                        <div className="mt-6 space-y-3 border-t pt-4">
                            <label className="flex items-start">
                                <input type="checkbox" checked={agreeData} onChange={() => setAgreeData(!agreeData)} className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span className="ml-2 text-sm text-slate-600">Saya menyatakan bahwa semua data yang saya isi dalam formulir pendaftaran ini sudah sesuai dan benar.</span>
                            </label>
                            <label className="flex items-start">
                                <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span className="ml-2 text-sm text-slate-600">Dengan daftar di SEMI marketplace, maka semua tunduk pada Term & Condition yang SEMI buat.</span>
                            </label>
                        </div>

                        <button type="submit" disabled={isSubmitDisabled} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed">
                            Daftar Reseller
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

