import React, { useState, useEffect } from 'react';

// Komponen untuk modal pendaftaran toko baru (versi lengkap)
export default function StoreRegisterModal({ isOpen, onClose, onRegistrationSuccess, openMessageModal }) {
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
                    setDistricts([]); // Reset kecamatan
                    setVillages([]); // Reset kelurahan
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
                    setVillages([]); // Reset kelurahan
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

    const handleStoreRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const storeData = Object.fromEntries(formData.entries());
        
        onRegistrationSuccess(storeData);
        openMessageModal('Pendaftaran Berhasil', 'Pendaftaran toko berhasil!');
    };

    const isSubmitDisabled = !agreeData || !agreeTerms;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Daftarkan Toko Online Anda</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleStoreRegister}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Kolom Kiri */}
                            <div className="space-y-4">
                                <input name="storeName" type="text" placeholder="Nama Toko" className="w-full p-2.5 border rounded-md" required />
                                <select name="storeCategory" className="w-full p-2.5 border rounded-md bg-white" required>
                                    <option value="">Pilih Kategori Toko</option>
                                    <option value="Makanan & Minuman">Makanan & Minuman</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Kerajinan Tangan">Kerajinan Tangan</option>
                                    <option value="Elektronik">Elektronik</option>
                                    <option value="Kecantikan & Perawatan">Kecantikan & Perawatan</option>
                                    <option value="Kesehatan">Kesehatan</option>
                                    <option value="Rumah Tangga">Rumah Tangga</option>
                                    <option value="Hobi & Koleksi">Hobi & Koleksi</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                                <textarea name="address" placeholder="Alamat Lengkap Toko" rows="3" className="w-full p-2.5 border rounded-md" required></textarea>
                                <select name="province" onChange={(e) => setSelectedProvince(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" required>
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <select name="regency" onChange={(e) => setSelectedRegency(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedProvince} required>
                                    <option value="">Pilih Kota/Kabupaten</option>
                                    {regencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                                <select name="district" onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedRegency} required>
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                                <select name="village" className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedDistrict} required>
                                    <option value="">Pilih Kelurahan</option>
                                    {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                                </select>
                                <input name="postalCode" type="text" placeholder="Kode Pos" className="w-full p-2.5 border rounded-md" required />
                            </div>
                            {/* Kolom Kanan */}
                            <div className="space-y-4">
                                <input name="nib" type="text" placeholder="No. NIB (Kosongkan jika tidak ada)" className="w-full p-2.5 border rounded-md" />
                                <input name="npwp_pribadi" type="text" placeholder="No. NPWP Pribadi (Kosongkan jika tidak ada)" className="w-full p-2.5 border rounded-md" />
                                <input name="npwp_usaha" type="text" placeholder="No. NPWP Usaha (Kosongkan jika tidak ada)" className="w-full p-2.5 border rounded-md" />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Upload Photo Toko Tampak Depan</label>
                                    <input name="storePhoto" type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                                </div>
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
                            Daftarkan Toko
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

