import React from 'react';
import ProductGrid from './ProductGrid'; // Menggunakan kembali komponen ProductGrid

// Komponen untuk menampilkan halaman toko seorang penjual
export default function StorePage({ seller, products, onNavigate, sellers, addToCart, handleBuyNow }) {
    return (
        <div>
            {/* Banner Toko */}
            <div className="h-48 bg-slate-200">
                <img src={seller.bannerUrl} alt={`${seller.name} banner`} className="w-full h-full object-cover" />
            </div>
            <div className="container mx-auto px-4 py-8">
                {/* Informasi Toko */}
                <div className="flex items-center gap-4 mb-8">
                    <img 
                        src={`https://placehold.co/100x100/e2e8f0/475569?text=${seller.name.charAt(0)}`} 
                        alt={`${seller.name} logo`} 
                        className="w-24 h-24 rounded-full border-4 border-white -mt-16" 
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{seller.name}</h1>
                        <p className="text-slate-500">{seller.location}</p>
                    </div>
                </div>

                {/* Daftar Produk Toko */}
                <h2 className="text-2xl font-bold mb-6">Semua Produk dari {seller.name}</h2>
                <ProductGrid 
                    products={products} 
                    onNavigate={onNavigate} 
                    sellers={sellers} 
                    addToCart={addToCart} 
                    handleBuyNow={handleBuyNow} 
                />
            </div>
        </div>
    );
}
