import React from 'react';

// Komponen untuk halaman Tips & Trik
export default function TipsTrikPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Tips & Trik Berjualan</h1>
                <p className="text-slate-600 mb-8">Kumpulan tips praktis untuk meningkatkan penjualan Anda.</p>
                <p className="text-slate-700">Kami sedang menyiapkan berbagai tips dan trik menarik untuk Anda. Nantikan pembaruan selanjutnya!</p>
            </div>
        </div>
    );
}
