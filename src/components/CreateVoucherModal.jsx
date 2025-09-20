import React, { useState } from 'react';

// Komponen untuk modal pembuatan voucher
export default function CreateVoucherModal({ isOpen, onClose, onSave }) {
    const [voucherData, setVoucherData] = useState({
        code: '',
        type: 'Potongan Harga',
        value: '',
        startDate: '',
        endDate: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setVoucherData({ ...voucherData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(voucherData);
        onClose(); // Menutup modal setelah berhasil menyimpan
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Buat Voucher Baru</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input name="code" onChange={handleChange} type="text" placeholder="Kode Voucher (Contoh: DISKON50)" className="w-full p-2.5 border rounded-md" required />
                    <select name="type" onChange={handleChange} className="w-full p-2.5 border rounded-md bg-white">
                        <option>Potongan Harga</option>
                        <option>Persentase</option>
                        <option>Gratis Ongkir</option>
                    </select>
                    <input name="value" onChange={handleChange} type="number" placeholder="Nilai (Contoh: 10000 atau 10 untuk %)" className="w-full p-2.5 border rounded-md" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="startDate" onChange={handleChange} type="date" className="w-full p-2.5 border rounded-md" required />
                        <input name="endDate" onChange={handleChange} type="date" className="w-full p-2.5 border rounded-md" required />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Batal</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Simpan Voucher</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

