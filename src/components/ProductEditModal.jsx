import React, { useState, useEffect } from 'react';
import api from '../api';

export default function ProductEditModal({ isOpen, onClose, onSave, product, sellers, openMessageModal }) {
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                id: product._id, // Use _id from MongoDB
                name: product.name || '',
                price: product.price || '',
                stock: product.stock || '',
                category: product.category || '',
                sellerId: product.sellerId || '',
                description: product.description || '',
                imageUrl: product.imageUrl || 'https://placehold.co/400x400/A9A9A9/ffffff?text=Produk',
            });
        } else {
            // Reset for new product mode, though this modal seems focused on editing
            setFormData({
                id: null, name: '', price: '', stock: '', category: '', sellerId: '', description: '',
                imageUrl: 'https://placehold.co/400x400/A9A9A9/ffffff?text=Produk+Baru',
            });
        }
        // Reset image file on modal open
        setImageFile(null);
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Preview the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.sellerId) {
            openMessageModal('Peringatan', 'Semua kolom harus diisi.');
            return;
        }
        
        setIsSubmitting(true);

        const dataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'imageUrl' && key !== 'id') { // Don't send imageUrl directly
                dataToSend.append(key, formData[key]);
            }
        });

        if (imageFile) {
            dataToSend.append('productImage', imageFile);
        }

        try {
            const url = product ? `/api/products/${formData.id}` : '/api/products';
            const method = product ? 'put' : 'post';

            const response = await api[method](url, dataToSend);

            openMessageModal('Berhasil', `Produk berhasil ${product ? 'diperbarui' : 'disimpan'}.`);
            onSave(response.data); // Notify parent component
            onClose();
        } catch (error) {
            console.error('Error saving product:', error.response?.data || error.message);
            openMessageModal('Gagal', error.response?.data?.message || `Gagal menyimpan produk.`);
        } finally {
            setIsSubmitting(false);
        }
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
                        <label className="block text-sm font-medium text-slate-700">Gambar Produk</label>
                        <div className="mt-1 flex items-center gap-4">
                            <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-md bg-slate-100"/>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-slate-100" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Batal</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-teal-400">
                            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}