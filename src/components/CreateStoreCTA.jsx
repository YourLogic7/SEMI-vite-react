import React from 'react';

// Komponen untuk Call-to-Action (CTA) Buka Toko
export default function CreateStoreCTA({ onOpenStoreClick }) {
    return (
        <section className="my-12 bg-teal-600 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                <div className="flex-shrink-0">
                    <img src="https://imgur.com/18Ythw9.png" alt="Logo" className="h-12 brightness-0 invert"/>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold">Punya usaha? Buka toko online Anda sekarang!</h3>
                    <p className="opacity-80 mt-1">Gratis, cepat, dan mudah dikelola.</p>
                </div>
                <div className="flex-shrink-0">
                    <a href="#" onClick={(e) => { e.preventDefault(); onOpenStoreClick(); }} className="px-6 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-slate-100 transition-transform hover:scale-105 inline-block">
                        Mulai Jualan Gratis
                    </a>
                </div>
            </div>
        </section>
    );
}
