import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

// Komponen untuk sidebar filter produk (versi lengkap)
export default function FilterSidebar({ products, sellers, filters, onFilterChange, onResetFilters }) {
    // State untuk data alamat dari API
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);

    // State untuk menyimpan pilihan lokasi pengguna
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');

    // Efek untuk mengambil data provinsi saat komponen dimuat
    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(response => response.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Gagal mengambil data provinsi:", err));
    }, []);

    // Efek untuk mengambil data kabupaten/kota saat provinsi dipilih
    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
                .then(response => response.json())
                .then(data => {
                    setRegencies(data);
                    setDistricts([]); // Reset kecamatan
                });
        }
    }, [selectedProvince]);

    // Efek untuk mengambil data kecamatan saat kabupaten/kota dipilih
    useEffect(() => {
        if (selectedRegency) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
                .then(response => response.json())
                .then(data => setDistricts(data));
        }
    }, [selectedRegency]);

    const handleChange = (e) => {
        onFilterChange(prevFilters => ({
            ...prevFilters,
            [e.target.name]: e.target.value
        }));
    };
    
    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        if (name === 'province') {
            setSelectedProvince(value);
            // Reset pilihan bawahnya
            setSelectedRegency('');
            onFilterChange(prev => ({...prev, regency: '', district: ''}));
        }
        if (name === 'regency') {
            setSelectedRegency(value);
            onFilterChange(prev => ({...prev, district: ''}));
        }
        onFilterChange(prev => ({...prev, [name]: value}));
    };

    const handleRatingChange = (newRating) => {
        onFilterChange(prevFilters => ({
            ...prevFilters,
            rating: newRating
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <h3 className="text-xl font-bold mb-4">Filter Produk</h3>
            <div className="space-y-6">
                {/* Urutan Produk */}
                <div>
                    <label htmlFor="sortBy" className="block text-sm font-semibold text-slate-700 mb-2">Urutkan</label>
                    <select id="sortBy" name="sortBy" value={filters.sortBy || 'terbaru'} onChange={handleChange} className="w-full p-2.5 border rounded-md bg-white">
                        <option value="terbaru">Terbaru</option>
                        <option value="terlaris">Terlaris</option>
                        <option value="termurah">Harga Termurah</option>
                        <option value="termahal">Harga Termahal</option>
                    </select>
                </div>

                {/* Filter Lokasi */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Toko</label>
                    <div className="space-y-2">
                         <select name="province" onChange={handleLocationChange} className="w-full p-2.5 border rounded-md bg-white">
                            <option value="">Pilih Provinsi</option>
                            {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <select name="regency" onChange={handleLocationChange} className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedProvince}>
                            <option value="">Pilih Kota/Kabupaten</option>
                            {regencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                        <select name="district" onChange={handleChange} className="w-full p-2.5 border rounded-md bg-white" disabled={!selectedRegency}>
                            <option value="">Pilih Kecamatan</option>
                            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Filter Harga */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Harga</label>
                    <div className="flex items-center gap-2">
                        <input type="number" name="minPrice" value={filters.minPrice || ''} onChange={handleChange} placeholder="Min" className="w-full p-2 border rounded-md" />
                        <span>-</span>
                        <input type="number" name="maxPrice" value={filters.maxPrice || ''} onChange={handleChange} placeholder="Max" className="w-full p-2 border rounded-md" />
                    </div>
                </div>
                
                {/* Filter Rating */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                    <StarRating rating={filters.rating || 0} setRating={handleRatingChange} interactive={true} />
                </div>
                <button onClick={onResetFilters} className="w-full py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Reset Filter</button>
            </div>
        </div>
    );
}
