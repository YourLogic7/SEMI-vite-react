import React, { useState, useEffect } from 'react';

const renderStoreButton = (user, handleNavigate, onOpenStoreClick) => {
    if (!user) {
        // If no user is logged in, show "Mulai Berjualan" to prompt login/registration
        return (
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenStoreClick(); }} className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                Mulai Berjualan
            </a>
        );
    }

    switch (user.role) {
        case 'seller':
            return (
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('sellerDashboard'); }} className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-600 rounded-lg hover:bg-teal-50 transition-colors">
                    Toko Anda
                </a>
            );
        case 'reseller':
            return (
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('resellerDashboard'); }} className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-600 rounded-lg hover:bg-teal-50 transition-colors">
                    Reseller Anda
                </a>
            );
        case 'affiliate':
            return (
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('affiliateDashboard'); }} className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-600 rounded-lg hover:bg-teal-50 transition-colors">
                    Affiliate Anda
                </a>
            );
        case 'customer':
        default:
            // If user is a customer or has no specific role, show "Mulai Berjualan"
            return (
                <a href="#" onClick={(e) => { e.preventDefault(); onOpenStoreClick(); }} className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                    Mulai Berjualan
                </a>
            );
    }
};

// Komponen untuk bagian atas (header) halaman web (dengan notifikasi fungsional)
export default function Header({ user, onLoginClick, onRegisterClick, onLogoutClick, onTrackOrderClick, onCartClick, cartItemCount, onNavigate, searchQuery, onSearchSubmit, onOpenStoreClick, notifications, setNotifications }) {
    const [isNotifOpen, setNotifOpen] = useState(false);
    const [localQuery, setLocalQuery] = useState(searchQuery);

    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(localQuery);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (notifId) => {
        setNotifications(prev => 
            prev.map(n => n.id === notifId ? { ...n, read: true } : n)
        );
    };

    // Fungsi navigasi yang diperbaiki untuk konsistensi
    const handleNavigate = (page, data = null) => {
        onNavigate(page, data);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="bg-slate-100 border-b border-slate-200">
                <div className="container mx-auto px-4 flex justify-end items-center text-xs text-slate-600 h-8">
                    <div className="flex items-center gap-4">
                        {/* <button onClick={() => handleNavigate('liveStream')} className="relative font-semibold text-red-600 flex items-center gap-1" display="hidden">
                            <span className="absolute -top-1 -left-1 w-3 h-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            LIVE
                        </button> */}
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('bantuan'); }} className="hover:text-teal-600">Bantuan</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('blog'); }} className="hover:text-teal-600">Blog</a>
                        <a href="https://satuperdua.my.id/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:underline">Gabung Komunitas</a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-6">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}><img src="https://imgur.com/18Ythw9.png" alt="Logo SEMI Marketplace" className="h-10 w-auto"/></a>
                        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center gap-2 relative">
                            <svg className="w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input 
                                type="search" 
                                placeholder="Cari di SEMI Marketplace" 
                                className="w-64 pl-2 pr-4 py-2 focus:outline-none"
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onTrackOrderClick} className="hidden md:block text-sm font-semibold hover:text-teal-600">Lacak Pesanan</button>
                        {user && (
                            <div className="relative">
                                <button onClick={() => setNotifOpen(!isNotifOpen)} className="relative text-sm font-semibold hover:text-teal-600">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{unreadCount}</span>
                                    )}
                                </button>
                                {isNotifOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-10">
                                        <div className="p-3 font-bold border-b">Notifikasi</div>
                                        <div className="p-2 text-sm max-h-80 overflow-y-auto">
                                            {notifications.length > 0 ? notifications.map(notif => (
                                                <div key={notif.id} onClick={() => handleMarkAsRead(notif.id)} className={`p-2 rounded-lg cursor-pointer ${notif.read ? 'text-slate-400' : 'hover:bg-slate-50 font-semibold'}`}>
                                                    <p>{notif.text}</p>
                                                </div>
                                            )) : <p className="p-2 text-slate-500">Tidak ada notifikasi baru.</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <button onClick={onCartClick} className="relative hidden md:block text-sm font-semibold hover:text-teal-600">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartItemCount}</span>}
                        </button>
                        <div className="hidden md:flex items-center gap-2">
                             {user ? (
                                <>
                                    {/* --- PERBAIKAN DI SINI --- */}
                                    <button onClick={() => handleNavigate('userProfile')} className="flex items-center gap-2 text-sm font-semibold hover:text-teal-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                        <span>Halo, {user.displayName}</span>
                                    </button>
                                    <button onClick={onLogoutClick} className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-50">Keluar</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Masuk</button>
                                    <button onClick={onRegisterClick} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Daftar</button>
                                </>
                            )}
                        </div>
                        {renderStoreButton(user, handleNavigate, onOpenStoreClick)}
                    </div>
                </div>
            </div>
        </header>
    );
}

// ini buat ubah tulisan ketika sudah daftar toko
                        // {hasStore ? (
                        //     <a
                        //         href="#"
                        //         onClick={e => {
                        //             e.preventDefault();
                        //             handleNavigate('myStore');
                        //         }}
                        //         className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                        //     >
                        //         Toko Saya
                        //     </a>
                        // ) : (
                        //     <a
                        //         href="#"
                        //         onClick={e => {
                        //             e.preventDefault();
                        //             onOpenStoreClick();
                        //         }}
                        //         className="px-4 py-2 text-sm font-bold text-teal-600 border-2 border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                        //     >
                        //         Mulai Berjualan
                        //     </a>
                        // )}
