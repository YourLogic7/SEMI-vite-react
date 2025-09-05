import React, { useState, useEffect } from 'react';
import FlashSaleProductCard from './FlashSaleProductCard';

// Komponen untuk bagian Flash Sale di halaman utama
export default function FlashSaleSection({ products, onNavigate }) {
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        // Atur waktu akhir flash sale (misalnya, tengah malam hari ini)
        const countdownDate = new Date();
        countdownDate.setHours(24, 0, 0, 0);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                setTimeLeft({
                    hours: hours.toString().padStart(2, '0'),
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0')
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="my-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Header Flash Sale */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-red-600">Flash Sale</h2>
                        <div className="flex items-center gap-2 text-slate-700">
                            <span>Berakhir dalam</span>
                            <span className="bg-red-600 text-white font-bold text-lg px-2 py-1 rounded-md">{timeLeft.hours}</span>:
                            <span className="bg-red-600 text-white font-bold text-lg px-2 py-1 rounded-md">{timeLeft.minutes}</span>:
                            <span className="bg-red-600 text-white font-bold text-lg px-2 py-1 rounded-md">{timeLeft.seconds}</span>
                        </div>
                    </div>
                    <a href="#" className="text-teal-600 font-semibold hover:underline">Lihat Semua</a>
                </div>
                {/* Grid Produk Flash Sale */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.map(product => (
                        <FlashSaleProductCard key={product.id} product={product} onNavigate={onNavigate} />
                    ))}
                </div>
            </div>
        </section>
    );
}
