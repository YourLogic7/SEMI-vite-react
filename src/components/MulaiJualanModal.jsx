import React from 'react';

// Komponen untuk modal pilihan peran (Toko, Reseller, Affiliate)
export default function MulaiJualanModal({ isOpen, onClose, onSelectRole }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Pilih Tipe Akun Penjual</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <button 
                        onClick={() => onSelectRole('seller')} 
                        className="w-full text-left p-4 border rounded-lg hover:bg-teal-50 hover:border-teal-500 transition-colors"
                    >
                        <h4 className="font-bold">Daftar Toko Online</h4>
                        <p className="text-sm text-slate-600">Jual produk Anda sendiri langsung ke pelanggan.</p>
                    </button>
                    <button 
                        onClick={() => onSelectRole('reseller')} 
                        className="w-full text-left p-4 border rounded-lg hover:bg-teal-50 hover:border-teal-500 transition-colors"
                    >
                        <h4 className="font-bold">Daftar Reseller</h4>
                        <p className="text-sm text-slate-600">Jual kembali produk yang sudah ada di marketplace.</p>
                    </button>
                    <button 
                        onClick={() => onSelectRole('affiliate')} 
                        className="w-full text-left p-4 border rounded-lg hover:bg-teal-50 hover:border-teal-500 transition-colors"
                    >
                        <h4 className="font-bold">Daftar Affiliate</h4>
                        <p className="text-sm text-slate-600">Dapatkan komisi dengan mempromosikan produk.</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
