import React from 'react';

// Komponen untuk halaman Pembayaran
export default function PembayaranPage({ onNavigate }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Metode Pembayaran</h1>
                <p className="text-slate-600 mb-8">Kami menyediakan berbagai pilihan pembayaran yang aman dan mudah.</p>
                <div className="space-y-4 text-slate-700">
                    <p>Semua transaksi di SEMI Marketplace dijamin keamanannya melalui layanan Payment Aggregator <span className="font-bold">HIJIPAY X IPAYMU</span>.</p>
                    <p>Anda dapat melakukan pembayaran melalui:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Transfer Bank (Virtual Account)</li>
                        <li>Kartu Kredit & Debit</li>
                        <li>E-Wallet (GoPay, OVO, Dana, LinkAja)</li>
                        <li>Gerai Retail (Alfamart, Indomaret)</li>
                        <li>Layanan Bayar di Tempat (COD)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
