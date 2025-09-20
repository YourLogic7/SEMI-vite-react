import React from 'react';
import ProductGrid from './ProductGrid';
import HeroSlider from './HeroSlider';
import CategoryIcons from './CategoryIcons';
import FilterSidebar from './FilterSidebar';
import CreateStoreCTA from './CreateStoreCTA';
import PpobSection from './PpobSection';
import FlashSaleSection from './FlashSaleSection';

// Komponen ini mengatur tampilan utama halaman home
export default function MainContent({ 
    products, allProducts, sellers, onNavigate, searchQuery, filters, onFilterChange, 
    onResetFilters, addToCart, handleBuyNow, onOpenStoreClick,
    visibleProductsCount, setVisibleProductsCount, wishlist, onToggleWishlist, flashSaleProducts
}) {
    
    // --- PERBAIKAN DI SINI ---
    // Mengubah cara memanggil fungsi agar sesuai dengan setup dari App.jsx
    const handleLoadMore = () => {
        // Menambahkan 12 ke jumlah produk yang terlihat saat ini
        setVisibleProductsCount(visibleProductsCount + 12);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <HeroSlider />
            <CategoryIcons onNavigate={onNavigate} />
            <FlashSaleSection products={flashSaleProducts} onNavigate={onNavigate} />
            <PpobSection />
            <CreateStoreCTA onOpenStoreClick={onOpenStoreClick} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                <div className="md:col-span-1">
                    <FilterSidebar 
                        products={allProducts}
                        sellers={sellers}
                        filters={filters}
                        onFilterChange={onFilterChange}
                        onResetFilters={onResetFilters}
                    />
                </div>
                <div className="md:col-span-3">
                    {products.length > 0 ? (
                        <>
                            <ProductGrid 
                                products={products} 
                                onNavigate={onNavigate} 
                                sellers={sellers} 
                                addToCart={addToCart} 
                                handleBuyNow={handleBuyNow} 
                                wishlist={wishlist}
                                onToggleWishlist={onToggleWishlist}
                            />
                            {/* Tombol ini sekarang akan berfungsi dengan benar */}
                            {visibleProductsCount < allProducts.length && (
                                <div className="text-center mt-8">
                                    <button 
                                        onClick={handleLoadMore}
                                        className="px-6 py-3 font-semibold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                                    >
                                        Lihat Lainnya
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-slate-500 text-center py-10">Tidak ada produk yang cocok dengan kriteria Anda.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
