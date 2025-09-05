import React from 'react';
import { ShoppingCart, ShoppingBag, Heart, MapPin } from 'lucide-react';

// Komponen untuk menampilkan kartu produk individual
export default function ProductCard({ product, onNavigate, wishlist, onToggleWishlist, addToCart, handleBuyNow }) {
    if (!product) {
        return null;
    }

    const isWishlisted = wishlist.includes(product.id);

    const handleCardClick = (e) => {
        if (e.target.closest('button')) {
            return;
        }
        onNavigate('productDetail', product);
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            onClick={handleCardClick}
        >
            <div className="relative">
                <img 
                    src={product.imageUrl || 'https://placehold.co/400x400/eee/ccc?text=Produk'} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/eee/ccc?text=Error'; }}
                />
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition-colors"
                    aria-label="Toggle Wishlist"
                >
                    <Heart size={20} className={`${isWishlisted ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
                </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg truncate group-hover:text-teal-600">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-1">{product.sellerName || 'Penjual Terpercaya'}</p>
                
                {/* --- PERBAIKAN DI SINI: Menambahkan Lokasi Penjual --- */}
                <div className="flex items-center text-xs text-slate-400 mb-2">
                    <MapPin size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{product.sellerLocation || 'Indonesia'}</span>
                </div>

                <p className="font-bold text-xl text-slate-800 mb-2">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)}
                </p>
                <div className="text-xs text-slate-400">
                    <span>Terjual {product.sold}</span>
                </div>
                <div className="mt-4 flex gap-2 pt-2 border-t border-slate-100 mt-auto">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="w-1/3 px-3 py-2 text-sm font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center"
                        aria-label="Tambah ke Keranjang"
                    >
                        <ShoppingCart size={18} />
                    </button>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNow(product);
                        }}
                        className="w-2/3 px-3 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                        aria-label="Beli Langsung"
                    >
                        <ShoppingBag size={18} />
                        <span>Beli</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
