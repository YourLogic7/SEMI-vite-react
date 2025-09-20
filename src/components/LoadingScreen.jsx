import React from 'react';

// Komponen untuk menampilkan layar loading awal
export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-slate-50 flex justify-center items-center z-50">
            <div className="text-center">
                <img 
                    src="https://imgur.com/18Ythw9.png" 
                    alt="Logo SEMI Marketplace" 
                    className="h-20 w-auto animate-pulse-slow" // Menggunakan animasi kustom
                />
            </div>
        </div>
    );
}
