import React, { useState, useEffect } from 'react';

// Komponen modal untuk menambah atau mengubah produk
export default function ProductEditModal({ isOpen, onClose, onSave, product, sellers, openMessageModal }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Jika ada data 'product', berarti ini mode edit. Isi form dengan datanya.
        if (product) {
            setFormData({
                id: product.id,
                name: product.name || '',
                price: product.price || '',
                stock: product.stock || '',
                category: product.category || '',
                sellerId: product.sellerId || '',
                description: product.description || '',
                imageUrl: product.imageUrl || 'https://placehold.co/400x400/A9A9A9/ffffff?text=Produk',
            });
        } else {
            // Jika tidak, ini mode tambah baru. Kosongkan form.
            setFormData({
                id: null,
                name: '', 
                price: '', 
                stock: '', 
                category: '', 
                sellerId: '', 
                description: '',
                imageUrl: 'https://placehold.co/400x400/A9A9A9/ffffff?text=Produk+Baru',
            });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.sellerId) {
            openMessageModal('Peringatan', 'Semua kolom harus diisi.');
            return;
        }

        const productData = {
            ...formData,
            id: formData.id || Date.now(), // Gunakan ID lama atau buat ID baru
            price: parseInt(formData.price, 10) || 0,
            stock: parseInt(formData.stock, 10) || 0,
            sellerId: parseInt(formData.sellerId, 10),
            sold: product ? product.sold : 0,
            reviews: product ? product.reviews : [],
        };
        onSave(productData);
        onClose(); // Menutup modal setelah berhasil menyimpan
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nama Produk</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Harga</label>
                            <input type="number" name="price" value={formData.price || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Stok</label>
                            <input type="number" name="stock" value={formData.stock || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Kategori</label>
                            <input type="text" name="category" value={formData.category || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Penjual</label>
                            <select name="sellerId" value={formData.sellerId || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md bg-white" required>
                                <option value="">Pilih Penjual</option>
                                {Array.isArray(sellers) && sellers.map(seller => (
                                    <option key={seller.id} value={seller.id}>{seller.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" rows="3"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">URL Gambar</label>
                        <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Batal</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

