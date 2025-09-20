import React from 'react';
import ProductCard from './ProductCard';

// Komponen ini bertugas untuk menampilkan semua produk dalam sebuah grid
export default function ProductGrid({ products, onNavigate, sellers, addToCart, handleBuyNow, wishlist, onToggleWishlist }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(product => 
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onNavigate={onNavigate}
                    seller={sellers.find(s => s.id === product.sellerId)}
                    addToCart={addToCart}
                    handleBuyNow={handleBuyNow}
                    wishlist={wishlist}
                    onToggleWishlist={onToggleWishlist}
                />
            )}
        </div>
    );
}

