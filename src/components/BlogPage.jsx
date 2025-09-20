import React from 'react';

// Komponen untuk halaman Blog
export default function BlogPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Blog SEMI Marketplace</h1>
                <p className="text-slate-600 mb-8">Artikel, tips, dan cerita inspiratif dari dunia UMKM.</p>
                
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-semibold">5 Tips Foto Produk Hanya dengan HP</h2>
                        <p className="text-sm text-slate-500">Dipublikasikan pada 15 Agustus 2025</p>
                        <p className="mt-2 text-slate-600">Tidak punya kamera mahal? Jangan khawatir! Dengan kamera HP dan sedikit kreativitas, Anda bisa menghasilkan foto produk yang menarik pelanggan. Berikut adalah 5 tips sederhana yang bisa Anda coba...</p>
                    </div>
                    <div className="border-b pb-4">
                        <h2 className="text-2xl font-semibold">Kisah Sukses: Dari Dapur Rumah ke Pasar Nasional</h2>
                        <p className="text-sm text-slate-500">Dipublikasikan pada 10 Agustus 2025</p>
                        <p className="mt-2 text-slate-600">Ibu Siti memulai usaha sambal kemasan dari dapur kecilnya. Berkat kegigihan dan pemanfaatan marketplace, kini produknya sudah bisa dinikmati di seluruh Indonesia. Simak kisah inspiratifnya di sini.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
