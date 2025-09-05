import React from 'react';

// Komponen untuk halaman Cara Belanja
export default function CaraBelanjaPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Cara Berbelanja</h1>
                <p className="text-slate-600 mb-8">Ikuti langkah-langkah mudah berikut untuk berbelanja di SEMI Marketplace.</p>
                
                <ol className="list-decimal list-inside space-y-4 text-slate-700">
                    <li><span className="font-semibold">Cari Produk:</span> Gunakan kolom pencarian atau jelajahi kategori untuk menemukan produk yang Anda inginkan.</li>
                    <li><span className="font-semibold">Login/Daftar:</span> Jika Anda ingin membeli, pastikan Anda sudah masuk ke akun Anda. Jika belum punya, silakan daftar terlebih dahulu.</li>
                    <li><span className="font-semibold">Masukkan ke Keranjang:</span> Klik tombol '+ Keranjang' pada produk yang ingin Anda beli.</li>
                    <li><span className="font-semibold">Checkout:</span> Klik ikon keranjang di pojok kanan atas, periksa kembali pesanan Anda, lalu klik 'Lanjut ke Pembayaran'.</li>
                    <li><span className="font-semibold">Isi Alamat & Pilih Pembayaran:</span> Lengkapi alamat pengiriman Anda dan pilih metode pembayaran yang diinginkan.</li>
                    <li><span className="font-semibold">Selesaikan Pembayaran:</span> Lakukan pembayaran sesuai instruksi. Setelah selesai, pesanan Anda akan segera diproses oleh penjual.</li>
                </ol>
            </div>
        </div>
    );
}
