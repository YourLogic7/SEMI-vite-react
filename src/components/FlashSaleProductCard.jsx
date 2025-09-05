import React from 'react';
import { MapPin } from 'lucide-react';

// Komponen untuk kartu produk khusus Flash Sale
export default function FlashSaleProductCard({ product, onNavigate }) {
    // Menghitung persentase diskon
    const discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100);
    // Menghitung persentase stok yang terjual untuk progress bar
    const soldPercentage = Math.round((product.sold / product.totalStock) * 100);

    const handleCardClick = () => {
        if (onNavigate) {
            onNavigate('productDetail', product);
        }
    };

    return (
        <div 
            onClick={handleCardClick}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer flex flex-col"
        >
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover"/>
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                    {discountPercentage}% OFF
                </div>
            </div>
            <div className="p-3 flex-grow flex flex-col">
                <h3 className="text-sm font-semibold text-slate-800 truncate">{product.name}</h3>
                
                {/* --- PERBAIKAN DI SINI: Menambahkan Lokasi Penjual --- */}
                <div className="flex items-center text-xs text-slate-400 mt-1">
                    <MapPin size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{product.sellerLocation || 'Indonesia'}</span>
                </div>

                <div className="mt-2">
                    <p className="text-lg font-bold text-red-600">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.discountPrice)}
                    </p>
                    <p className="text-xs text-slate-500 line-through">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)}
                    </p>
                </div>
                <div className="mt-auto pt-2">
                    {/* Progress Bar Stok */}
                    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div 
                            className="bg-red-500 h-4 rounded-full" 
                            style={{ width: `${soldPercentage}%` }}
                        ></div>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                            {soldPercentage > 50 ? `Terjual ${product.sold}` : ''}
                        </span>
                    </div>
                     <p className="text-xs text-center text-red-600 font-semibold mt-1">
                        {soldPercentage > 80 && "Segera Habis!"}
                    </p>
                </div>
            </div>
        </div>
    );
}
