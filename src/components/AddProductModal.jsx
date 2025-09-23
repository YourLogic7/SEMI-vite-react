import React, { useState, useEffect } from 'react';
import { PlusCircle, X } from 'lucide-react';
import api from '../api';

export default function AddProductModal({ isOpen, onClose, onSave, productToEdit, openMessageModal, user }) {
    // REMOVED expired and volume from initial state
    const initialProductState = {
        name: '',
        category: 'Makanan & Minuman',
        description: '',
        brand: '',
        weight: '',
        variants: [{ name: '', stock: '', price: '' }],
        minPurchase: 1,
        preorder: 'Tidak',
        insurance: 'Tidak',
        condition: 'Baru',
        sku: '',
        shipping: [],
        images: [null],
        video: null,
    };

    const [productData, setProductData] = useState(initialProductState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const state = productToEdit
                ? { ...initialProductState, ...productToEdit, images: productToEdit.images || [null] }
                : initialProductState;
            setProductData(state);
        }
    }, [productToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const currentShipping = productData.shipping;
            if (checked) {
                setProductData(prev => ({ ...prev, shipping: [...currentShipping, name] }));
            } else {
                setProductData(prev => ({ ...prev, shipping: currentShipping.filter(s => s !== name) }));
            }
        } else {
            setProductData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleVariantChange = (index, e) => {
        const newVariants = [...productData.variants];
        newVariants[index][e.target.name] = e.target.value;
        setProductData(prev => ({ ...prev, variants: newVariants }));
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
        const newImages = [...productData.images];
        newImages[index] = file;
        setProductData(prev => ({ ...prev, images: newImages }));
    };

    const handleVideoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData(prev => ({ ...prev, video: file }));
        }
    };

    const addVariant = () => {
        if (productData.variants.length < 10) {
            setProductData(prev => ({ ...prev, variants: [...prev.variants, { name: '', stock: '', price: '' }] }));
        } else {
            openMessageModal('Batas Tercapai', 'Anda hanya dapat menambahkan maksimal 10 varian.');
        }
    };

    const removeVariant = (index) => {
        if (productData.variants.length > 1) {
            const newVariants = productData.variants.filter((_, i) => i !== index);
            setProductData(prev => ({ ...prev, variants: newVariants }));
        }
    };

    const addImageInput = () => {
        if (productData.images.length < 8) {
            setProductData(prev => ({ ...prev, images: [...prev.images, null] }));
        } else {
            openMessageModal('Batas Tercapai', 'Anda hanya dapat mengunggah maksimal 8 foto.');
        }
    };

    const removeImageInput = (index) => {
        if (productData.images.length > 1) {
            const newImages = productData.images.filter((_, i) => i !== index);
            setProductData(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = new FormData();

        if (user?._id) {
            formData.append('sellerId', user._id);
        } else if (!productToEdit) {
            openMessageModal('Error', 'Tidak dapat menemukan ID penjual. Silakan coba login kembali.');
            setIsSubmitting(false);
            return;
        }

        Object.keys(productData).forEach(key => {
            if (key !== 'images' && key !== 'video' && productData[key] !== null) {
                if (Array.isArray(productData[key]) || typeof productData[key] === 'object') {
                    formData.append(key, JSON.stringify(productData[key]));
                } else {
                    formData.append(key, productData[key]);
                }
            }
        });

        productData.images.forEach((image) => {
            if (image instanceof File) {
                formData.append('productImage', image);
            }
        });

        if (productData.video instanceof File) {
            formData.append('video', productData.video);
        }

        try {
            let response;
            if (productToEdit?._id) {
                response = await api.put(`/api/products/${productToEdit._id}`, formData);
            } else {
                response = await api.post('/api/products', formData);
            }

            openMessageModal('Berhasil', `Produk berhasil ${productToEdit ? 'diperbarui' : 'disimpan'}.`);
            onSave(response.data);
            onClose();

        } catch (error) {
            console.error('Error saving product:', error.response?.data || error.message);
            openMessageModal('Gagal', error.response?.data?.message || `Gagal ${productToEdit ? 'memperbarui' : 'menyimpan'} produk.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
                <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-semibold">{productToEdit ? 'Ubah Produk' : 'Tambah Produk Baru'}</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {/* Kolom Kiri */}
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold text-sm">1. Nama Produk</label>
                                <input name="name" value={productData.name} onChange={handleChange} type="text" className="w-full p-2 border rounded-md mt-1" required />
                            </div>
                            <div>
                                <label className="font-semibold text-sm">2. Kategori</label>
                                <select name="category" value={productData.category} onChange={handleChange} className="w-full p-2 border rounded-md bg-white mt-1" required>
                                    <option>Makanan & Minuman</option><option>Fashion Pria</option><option>Fashion Wanita</option><option>Elektronik</option><option>Kesehatan & Kecantikan</option><option>Rumah Tangga</option><option>Hobi & Koleksi</option><option>Otomotif</option><option>Ibu & Bayi</option><option>Olahraga</option><option>Buku & Alat Tulis</option><option>Lainnya</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold text-sm">3. Deskripsi Produk</label>
                                <textarea name="description" value={productData.description} onChange={handleChange} rows="4" className="w-full p-2 border rounded-md mt-1"></textarea>
                            </div>
                            <div>
                                <label className="font-semibold text-sm">4. Merek</label>
                                <input name="brand" value={productData.brand} onChange={handleChange} type="text" className="w-full p-2 border rounded-md mt-1" />
                            </div>
                            <div>
                                <label className="font-semibold text-sm">5. Berat (gram)</label>
                                <input name="weight" value={productData.weight} onChange={handleChange} type="number" className="w-full p-2 border rounded-md mt-1" />
                            </div>
                            <div>
                                <label className="font-semibold text-sm">6. Varian (Harga dan Stok diatur di sini)</label>
                                {productData.variants.map((variant, index) => (
                                    <div key={index} className="flex items-center gap-2 mt-1">
                                        <input name="name" value={variant.name} onChange={(e) => handleVariantChange(index, e)} type="text" placeholder="Nama Varian" className="w-1/3 p-2 border rounded-md" required />
                                        <input name="stock" value={variant.stock} onChange={(e) => handleVariantChange(index, e)} type="number" placeholder="Stok" className="w-1/3 p-2 border rounded-md" required />
                                        <input name="price" value={variant.price} onChange={(e) => handleVariantChange(index, e)} type="number" placeholder="Harga" className="w-1/3 p-2 border rounded-md" required />
                                        {productData.variants.length > 1 && <button type="button" onClick={() => removeVariant(index)}><X size={18} className="text-red-500" /></button>}
                                    </div>
                                ))}
                                <button type="button" onClick={addVariant} className="text-sm text-teal-600 font-semibold mt-2 flex items-center gap-1"><PlusCircle size={16} /> Tambah Varian</button>
                            </div>
                            <div>
                                <label className="font-semibold text-sm">7. Min. Pembelian</label>
                                <input name="minPurchase" value={productData.minPurchase} onChange={handleChange} type="number" className="w-full p-2 border rounded-md mt-1" required />
                            </div>
                        </div>
                        {/* Kolom Kanan */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold text-sm">8. Preorder</label>
                                    <div className="flex gap-4 mt-1"><label><input type="radio" name="preorder" value="Ya" checked={productData.preorder === 'Ya'} onChange={handleChange} /> Ya</label><label><input type="radio" name="preorder" value="Tidak" checked={productData.preorder === 'Tidak'} onChange={handleChange} /> Tidak</label></div>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm">9. Asuransi</label>
                                    <div className="flex gap-4 mt-1"><label><input type="radio" name="insurance" value="Ya" checked={productData.insurance === 'Ya'} onChange={handleChange} /> Aktifkan</label><label><input type="radio" name="insurance" value="Tidak" checked={productData.insurance === 'Tidak'} onChange={handleChange} /> Tidak</label></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold text-sm">10. Kondisi</label>
                                    <div className="flex gap-4 mt-1"><label><input type="radio" name="condition" value="Baru" checked={productData.condition === 'Baru'} onChange={handleChange} /> Baru</label><label><input type="radio" name="condition" value="Bekas" checked={productData.condition === 'Bekas'} onChange={handleChange} /> Bekas</label></div>
                                </div>
                                <div><label className="font-semibold text-sm">11. SKU Induk</label><input name="sku" value={productData.sku} onChange={handleChange} type="text" className="w-full p-2 border rounded-md mt-1" /></div>
                            </div>
                            <div>
                                <label className="font-semibold text-sm">12. Aktifkan Ekspedisi</label>
                                <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
                                    <label><input type="checkbox" name="Hemat" checked={productData.shipping.includes('Hemat')} onChange={handleChange} /> Hemat</label>
                                    <label><input type="checkbox" name="Regular" checked={productData.shipping.includes('Regular')} onChange={handleChange} /> Regular</label>
                                    <label><input type="checkbox" name="Kilat" checked={productData.shipping.includes('Kilat')} onChange={handleChange} /> Kilat</label>
                                    <label><input type="checkbox" name="Sameday" checked={productData.shipping.includes('Sameday')} onChange={handleChange} /> Sameday</label>
                                    <label><input type="checkbox" name="Instant" checked={productData.shipping.includes('Instant')} onChange={handleChange} /> Instant</label>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold text-sm">13. Upload Foto (Rasio 1:1, maks 2MB)</label>
                                {productData.images.map((img, index) => (
                                    <div key={index} className="flex items-center gap-2 mt-1">
                                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, index)} className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-slate-100" />
                                        {productData.images.length > 1 && <button type="button" onClick={() => removeImageInput(index)}><X size={18} className="text-red-500" /></button>}
                                    </div>
                                ))}
                                <button type="button" onClick={addImageInput} className="text-sm text-teal-600 font-semibold mt-2 flex items-center gap-1"><PlusCircle size={16} /> Tambah Foto</button>
                            </div>
                            <div>
                                <label className="font-semibold text-sm">14. Upload Video (Maks 30MB, 1280x1280px, 30 detik, MP4)</label>
                                <input name="video" type="file" accept="video/mp4" onChange={handleVideoFileChange} className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-slate-100 mt-1" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-6 mt-6 border-t sticky bottom-0 bg-white py-4 z-10">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Batal</button>
                        <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-teal-400">
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}