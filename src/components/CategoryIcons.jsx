import React from 'react';
import { Utensils, Shirt, Laptop, SprayCan, Home, Puzzle, Car, Book, Baby, Dumbbell, MoreHorizontal } from 'lucide-react';

// Komponen untuk menampilkan ikon-ikon kategori
export default function CategoryIcons({ onNavigate }) {
    const categories = [
        { name: "Makanan & Minuman", icon: <Utensils size={32} /> },
        { name: "Fashion Pria", icon: <Shirt size={32} /> },
        { name: "Fashion Wanita", icon: <Shirt size={32} /> },
        { name: "Elektronik", icon: <Laptop size={32} /> },
        { name: "Kesehatan & Kecantikan", icon: <SprayCan size={32} /> },
        { name: "Rumah Tangga", icon: <Home size={32} /> },
        { name: "Hobi & Koleksi", icon: <Puzzle size={32} /> },
        { name: "Otomotif", icon: <Car size={32} /> },
        { name: "Ibu & Bayi", icon: <Baby size={32} /> },
        { name: "Olahraga", icon: <Dumbbell size={32} /> },
        { name: "Buku & Alat Tulis", icon: <Book size={32} /> },
        { name: "Lainnya", icon: <MoreHorizontal size={32} /> },
    ];

    // Fungsi ini sekarang akan memanggil onNavigate untuk pindah halaman
    const handleCategoryClick = (categoryName) => {
        if (onNavigate) {
            onNavigate('categoryPage', { categoryName: categoryName });
        }
    };

    return (
        <section className="my-12">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 text-center">
                {categories.map((cat, index) => (
                    <a
                        href="#"
                        key={`${cat.name}-${index}`} // Kunci yang lebih unik
                        onClick={(e) => { e.preventDefault(); handleCategoryClick(cat.name); }}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                        <div className="text-teal-600 mb-2">{cat.icon}</div>
                        <span className="text-xs font-semibold">{cat.name}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
