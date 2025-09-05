import React from 'react';

// Komponen untuk halaman Tentang Kami
export default function TentangKamiPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Tentang SEMI Marketplace</h1>
                <p className="text-slate-600 mb-8">Memberdayakan UMKM Indonesia untuk Go Digital.</p>
                
                <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p>SEMI Marketplace lahir dari semangat untuk membantu para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di seluruh Indonesia agar dapat bersaing di era digital. Kami percaya bahwa setiap produk lokal memiliki cerita dan kualitas yang layak untuk dikenal oleh pasar yang lebih luas.</p>
                    <p>Misi kami adalah menyediakan platform yang mudah digunakan, aman, dan terpercaya bagi para penjual untuk memasarkan produk mereka, dan bagi para pembeli untuk menemukan produk-produk lokal berkualitas dengan mudah. Kami berkomitmen untuk terus berinovasi dan memberikan dukungan penuh bagi pertumbuhan ekosistem UMKM di tanah air.</p>
                </div>
            </div>
        </div>
    );
}
