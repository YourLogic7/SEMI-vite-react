import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import FilterSidebar from './FilterSidebar';

// Komponen untuk halaman Kategori Produk
export default function CategoryPage({ categoryName, allProducts, sellers, onNavigate, addToCart, handleBuyNow, wishlist, onToggleWishlist }) {
    // State untuk mengelola filter khusus di halaman ini
    const [filters, setFilters] = useState({ sortBy: 'terbaru' });

    // 1. Filter produk berdasarkan nama kategori yang diterima
    const categoryProducts = allProducts.filter(p => p.category === categoryName);

    // 2. Terapkan filter dan urutan dari sidebar
    const getFinalProducts = () => {
        let processedProducts = [...categoryProducts];

        // Logika untuk mengurutkan produk
        switch (filters.sortBy) {
            case 'terlaris':
                processedProducts.sort((a, b) => b.sold - a.sold);
                break;
            case 'termurah':
                processedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'termahal':
                processedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'terbaru':
            default:
                processedProducts.sort((a, b) => b.id - a.id);
                break;
        }

        // Logika untuk memfilter produk
        return processedProducts.filter(product => {
            const minPriceMatch = filters.minPrice ? product.price >= parseFloat(filters.minPrice) : true;
            const maxPriceMatch = filters.maxPrice ? product.price <= parseFloat(filters.maxPrice) : true;
            // Filter lain bisa ditambahkan di sini
            return minPriceMatch && maxPriceMatch;
        });
    };

    const finalProducts = getFinalProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <h1 className="text-3xl font-bold mb-8">Kategori: <span className="text-teal-600">{categoryName}</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    {/* Menggunakan komponen FilterSidebar yang fungsional */}
                    <FilterSidebar 
                        products={categoryProducts}
                        sellers={sellers}
                        filters={filters}
                        onFilterChange={setFilters}
                        onResetFilters={() => setFilters({ sortBy: 'terbaru' })}
                    />
                </div>
                <div className="md:col-span-3">
                    {finalProducts.length > 0 ? (
                        <ProductGrid 
                            products={finalProducts} 
                            onNavigate={onNavigate} 
                            sellers={sellers} 
                            addToCart={addToCart} 
                            handleBuyNow={handleBuyNow} 
                            wishlist={wishlist} // <-- PERBAIKAN DI SINI
                            onToggleWishlist={onToggleWishlist} // <-- PERBAIKAN DI SINI
                        />
                    ) : (
                        <p className="text-slate-500 text-center py-10">Tidak ada produk yang cocok dengan filter ini.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
