import React from 'react';

// Komponen untuk menampilkan bagian PPOB (Payment Point Online Bank)
export default function PpobSection() {
    const onPpobItemClick = (itemName) => {
        alert(`Fitur ${itemName} akan segera terintegrasi dengan API Key dari penyedia layanan PPOB.`);
    };

    const ppobItems = [
        { name: 'Pulsa', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
        { name: 'Paket Data', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg> },
        { name: 'Listrik PLN', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { name: 'BPJS', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
        { name: 'PDAM', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM9 12H5M19 12h-4M9 12a3 3 0 01-3-3h0a3 3 0 013-3h6a3 3 0 013 3h0a3 3 0 01-3 3H9z" /></svg> },
        { name: 'Lainnya', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg> },
    ];
    return (
        <section className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Tagihan & Isi Ulang</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                    {ppobItems.map(item => (
                        <a href="#" key={item.name} onClick={(e) => { e.preventDefault(); onPpobItemClick(item.name); }} className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                            <div className="text-teal-600 mb-2">{item.icon}</div>
                            <span className="text-sm font-semibold">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
