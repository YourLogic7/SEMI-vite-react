import React, { useState } from 'react';

// Komponen untuk modal input nomor resi
export default function ProcessOrderModal({ isOpen, onClose, onConfirm, orderId, openMessageModal }) {
    const [resi, setResi] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (resi.trim() === '') {
            openMessageModal('Peringatan', 'Nomor resi tidak boleh kosong.');
            return;
        }
        onConfirm(orderId, resi);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Proses Pesanan #{orderId}</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <label htmlFor="resi" className="block text-sm font-medium text-slate-700">Masukkan Nomor Resi Pengiriman</label>
                        <input 
                            id="resi"
                            type="text"
                            value={resi}
                            onChange={(e) => setResi(e.target.value)}
                            placeholder="Contoh: JNE1234567890"
                            className="w-full p-2.5 border rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Batal</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Konfirmasi & Kirim</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

