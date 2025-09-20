import React, { useState, useEffect } from 'react';

// Komponen untuk Halaman Live Streaming
export default function LiveStreamPlayer({ onNavigate }) {
    // State untuk simulasi chat
    const [messages, setMessages] = useState([
        { user: 'Budi', text: 'Diskonnya berapa persen kak?' },
        { user: 'Citra', text: 'Produknya ready stock?' },
        { user: 'Admin', text: 'Halo kak Budi, diskon 50% khusus selama live ya!' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        setMessages([...messages, { user: 'Anda', text: newMessage }]);
        setNewMessage('');
    };

    // Data dummy untuk produk yang ditampilkan di live stream
    const liveProducts = [
        { id: 201, name: "Kopi Gayo Flash Sale", price: 49000, imageUrl: "https://placehold.co/400x400/78350f/ffffff?text=Kopi+Gayo" },
        { id: 202, name: "Batik Tulis Diskon Kilat", price: 299000, imageUrl: "https://placehold.co/400x400/4f46e5/ffffff?text=Batik+Tulis" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
             <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 mb-6">
                &larr; Kembali ke Halaman Utama
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri: Video Player & Produk */}
                <div className="lg:col-span-2">
                    {/* Placeholder untuk Video Player */}
                    <div className="bg-black aspect-video rounded-lg flex items-center justify-center text-white relative">
                        <span className="text-2xl">Live Streaming Player</span>
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE
                        </div>
                    </div>

                    {/* Produk yang Ditampilkan */}
                    <div className="mt-4">
                        <h3 className="text-xl font-bold mb-2">Produk di Live Stream</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {liveProducts.map(product => (
                                <div key={product.id} className="bg-white p-2 rounded-lg shadow-sm border cursor-pointer">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-24 object-cover rounded-md"/>
                                    <p className="text-xs font-semibold mt-2 truncate">{product.name}</p>
                                    <p className="text-sm font-bold text-red-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Live Chat */}
                <div className="bg-white rounded-lg shadow-lg flex flex-col h-[60vh] lg:h-auto">
                    <h3 className="text-lg font-bold p-4 border-b">Live Chat</h3>
                    {/* Area Pesan */}
                    <div className="flex-grow p-4 space-y-3 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <span className={`font-bold text-sm ${msg.user === 'Admin' ? 'text-red-600' : 'text-teal-700'}`}>{msg.user}:</span>
                                <span className="text-sm text-slate-700 ml-2">{msg.text}</span>
                            </div>
                        ))}
                    </div>
                    {/* Area Input Pesan */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                        <input 
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Ketik pesan..."
                            className="w-full p-2 border rounded-md"
                        />
                        <button type="submit" className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
