import React from 'react';

// Komponen untuk halaman Pusat Edukasi
export default function PusatEdukasiPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Pusat Edukasi Penjual</h1>
                <p className="text-slate-600 mb-8">Tingkatkan kemampuan bisnis Anda dengan materi dari kami.</p>
                <p className="text-slate-700">Konten edukasi akan segera tersedia di sini. Kami akan menyediakan berbagai materi mulai dari cara mengambil foto produk yang baik, strategi pemasaran digital, hingga manajemen keuangan untuk UMKM.</p>
            </div>
        </div>
    );
}
