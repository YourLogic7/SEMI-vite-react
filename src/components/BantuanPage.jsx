import React from 'react';

// Komponen untuk halaman Pusat Bantuan
export default function BantuanPage({ onNavigate }) {
    
    // Daftar pertanyaan dan jawaban
    const faqs = [
        {
            question: "Bagaimana cara berbelanja?",
            answer: "Pilih produk yang Anda inginkan, klik tombol '+ Keranjang' atau 'Beli Langsung'. Jika Anda belum login, Anda akan diminta untuk masuk terlebih dahulu. Setelah itu, ikuti langkah-langkah di halaman checkout."
        },
        {
            question: "Metode pembayaran apa saja yang tersedia?",
            answer: "Kami menyediakan berbagai metode pembayaran, termasuk transfer bank, e-wallet, kartu kredit/debit melalui iPaymu, serta layanan Bayar di Tempat (COD)."
        },
        {
            question: "Bagaimana cara melacak pesanan saya?",
            answer: "Anda dapat melacak pesanan dengan mengklik tombol 'Lacak Pesanan' di bagian atas halaman. Anda akan memerlukan nomor transaksi atau nomor resi yang Anda terima setelah pembayaran."
        },
        {
            question: "Bagaimana cara menjadi penjual?",
            answer: "Untuk menjadi penjual, Anda harus login terlebih dahulu. Setelah itu, klik tombol 'Mulai Berjualan' dan pilih tipe akun yang Anda inginkan (Toko Online, Reseller, atau Affiliate), lalu ikuti langkah-langkah pendaftarannya."
        },
        {
            question: "Apakah aman berbelanja di sini?",
            answer: "Tentu saja. Kami menggunakan sistem pembayaran yang aman dan terverifikasi. Untuk keamanan tambahan, kami juga menyediakan layanan 'COD Cek Dulu' di mana Anda bisa memeriksa barang sebelum membayar."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Pusat Bantuan</h1>
                <p className="text-slate-600 mb-8">Temukan jawaban untuk pertanyaan yang sering diajukan.</p>
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="p-4 border rounded-lg group">
                            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                                {faq.question}
                                <span className="transition-transform transform group-open:rotate-180">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </summary>
                            <p className="mt-4 text-slate-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
