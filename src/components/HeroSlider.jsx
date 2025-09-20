import React, { useState, useEffect } from 'react';

// Komponen untuk slider gambar promo di halaman utama
export default function HeroSlider() {
    // Menggunakan gambar yang Anda berikan
    const sliderImages = [
        "https://imgur.com/d6KDIW8.png",
        "https://imgur.com/GQd6SSI.png",
        "https://placehold.co/1200x400/be123c/ffffff?text=Flash+Sale+8.8" // Placeholder lama, biarkan sebagai cadangan
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1));
        }, 3000);
        return () => clearInterval(slideInterval);
    }, [sliderImages.length]);

    return (
        <section className="w-full mx-auto mb-10 relative overflow-hidden rounded-xl shadow-lg h-[250px] md:h-[400px]">
            <div className="flex transition-transform ease-in-out duration-700 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {sliderImages.map((img, index) => (
                    <img src={img} alt={`Promo banner ${index + 1}`} className="w-full h-full object-cover flex-shrink-0" key={index}/>
                ))}
            </div>
            <div className="flex justify-center absolute bottom-4 w-full">
                {sliderImages.map((_, slideIndex) => (
                    <div 
                        key={slideIndex} 
                        onClick={() => setCurrentIndex(slideIndex)} 
                        className={`h-2 w-2 mx-1 cursor-pointer rounded-full transition-all ${currentIndex === slideIndex ? 'p-1.5 bg-white' : 'p-1 bg-white/50'}`}
                    ></div>
                ))}
            </div>
        </section>
    );
}

