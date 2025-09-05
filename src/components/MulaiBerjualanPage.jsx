import React from 'react';

// Komponen untuk halaman Mulai Berjualan
export default function MulaiBerjualanPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Mulai Berjualan di SEMI Marketplace</h1>
                <p className="text-slate-600 mb-8">Jangkau jutaan pelanggan di seluruh Indonesia bersama kami.</p>
                 <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p>Untuk mulai berjualan, Anda hanya perlu login ke akun Anda, lalu klik tombol "Mulai Berjualan" di pojok kanan atas. Anda akan diberi pilihan untuk mendaftar sebagai Toko Online, Reseller, atau Affiliate. Prosesnya cepat, mudah, dan gratis!</p>
                </div>
            </div>
        </div>
    );
}
