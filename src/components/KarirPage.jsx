import React from 'react';

// Komponen untuk halaman Karir
export default function KarirPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Karir di SEMI Marketplace</h1>
                <p className="text-slate-600 mb-8">Bergabunglah dengan tim kami untuk memberdayakan UMKM Indonesia.</p>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Saat ini belum ada lowongan tersedia.</h2>
                    <p className="text-slate-700">Silakan periksa kembali halaman ini di lain waktu untuk informasi terbaru mengenai kesempatan berkarir bersama kami.</p>
                </div>
            </div>
        </div>
    );
}
