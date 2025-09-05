import React from 'react';

// Komponen untuk halaman Lacak Pesanan
export default function LacakPesananPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Lacak Pesanan Anda</h1>
                <p className="text-slate-600 mb-8">Untuk melacak pesanan, silakan gunakan tombol "Lacak Pesanan" di pojok kanan atas halaman.</p>
            </div>
        </div>
    );
}
