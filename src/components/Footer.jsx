import React from 'react';

// Komponen untuk bagian bawah (footer) halaman web
export default function Footer({ onNavigate }) {
    const shippingPartners = [
        { name: 'Kurir 1', logoUrl: 'https://i.imgur.com/9FE92UV.png' },
        { name: 'Kurir 2', logoUrl: 'https://i.imgur.com/7QfaCXo.png' },
        { name: 'Kurir 3', logoUrl: 'https://i.imgur.com/zX1mpkB.png' },
    ];
    const paymentPartners = [
        { name: 'Bayar 1', logoUrl: 'https://i.imgur.com/c3bBL3s.png'},
        { name: 'Bayar 2', logoUrl: 'https://i.imgur.com/dMzACCa.png'},
    ];
     const additionalServices = [
        { name: 'Jaminan Kualitas', logoUrl: 'https://i.imgur.com/mnTNtT6.png' },
        { name: 'Layanan 24/7', logoUrl: 'https://i.imgur.com/GU1pazx.png' },
        { name: 'COD', logoUrl: 'https://i.imgur.com/Eky6EFX.png' },
    ];

    // Fungsi helper untuk navigasi yang konsisten
    const handleNavigate = (page, data = null) => {
        onNavigate(page, data);
    };

    return (
        <footer className="bg-white text-slate-600 mt-12 border-t">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">SEMI Marketplace</h4>
                        <ul className="space-y-2 text-sm">
                            {/* --- PERBAIKAN DI SINI --- */}
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('tentang-kami'); }} className="hover:text-teal-600">Tentang Kami</a></li>
                            <li><a href="https://satuperdua.my.id/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">Tentang SEMI Community</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('blog'); }} className="hover:text-teal-600">Blog</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('karir'); }} className="hover:text-teal-600">Karir</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Beli</h4>
                        <ul className="space-y-2 text-sm">
                            {/* --- PERBAIKAN DI SINI --- */}
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('cara-belanja'); }} className="hover:text-teal-600">Cara Berbelanja</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('pembayaran'); }} className="hover:text-teal-600">Pembayaran</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('lacak-pesanan'); }} className="hover:text-teal-600">Lacak Pesanan</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Jual</h4>
                        <ul className="space-y-2 text-sm">
                            {/* --- PERBAIKAN DI SINI --- */}
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('mulai-berjualan'); }} className="hover:text-teal-600">Mulai Berjualan</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('pusat-edukasi'); }} className="hover:text-teal-600">Pusat Edukasi</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigate('tips-trik'); }} className="hover:text-teal-600">Tips & Trik</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-4">Ikuti Kami</h4>
                        <div className="flex space-x-4">
                            {/* Ikon media sosial sekarang bisa diklik */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600" aria-label="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600" aria-label="Instagram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600" aria-label="X/Twitter"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600" aria-label="TikTok"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.59-2.02-2.06-4.58-1.52-7.19.52-2.61 2.23-4.53 4.31-5.91.02-.01.01-.02.01-.02.02-.02.03-.03.04-.04.04-.04.05-.04.06-.05.02-.01.03-.02.05-.03.02-.01.04-.02.06-.02.04-.02.06-.03.09-.04.02-.01.04-.02.06-.02.02-.01.05-.02.07-.03.02-.01.04-.01.06-.02.04-.02.07-.03.11-.04.02-.01.04-.01.06-.02.04-.02.07-.03.11-.04.03-.01.05-.02.08-.03.02-.01.04-.01.06-.02.04-.02.07-.03.11-.04.03-.01.05-.02.08-.02.02-.01.04-.02.07-.02.02-.01.04-.02.06-.02.04-.02.07-.03.1-.04.03-.01.05-.02.08-.02.02-.01.04-.02.06-.02.04-.02.07-.03.1-.04.03-.01.05-.02.08-.02.02-.01.04-.02.06-.02.04-.02.07-.03.1-.04.03-.01.05-.02.08-.02.02-.01.04-.02.06-.02.04-.02.07-.03.1-.04.03-.01.05-.02.08-.02.02-.01.04-.02.06-.02.04-.02.0" /></svg></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600" aria-label="YouTube"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.887 3.433 0 4.949 0 8.736v6.528c0 3.787.887 5.303 4.385 5.553 3.6.245 11.626.246 15.23 0 3.498-.25 4.385-1.766 4.385-5.553V8.736c0-3.787-.887-5.303-4.385-5.552zM9.75 15.025V7.975l6.5 3.525-6.5 3.525z"/></svg></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600" aria-label="LinkedIn"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-100">
                <div className="container mx-auto px-4 py-6 space-y-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <span className="text-xs font-semibold text-slate-500 mb-2 flex">Pilihan Kurir:</span>
                                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                                    {shippingPartners.map(partner => (
                                        <img key={partner.name} src={partner.logoUrl} alt={partner.name} className="h-4" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                 <span className="text-xs font-semibold text-slate-500 mb-2 flex">Pembayaran:</span>
                                <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
                                    {paymentPartners.map(partner => (
                                        <img key={partner.name} src={partner.logoUrl} alt={partner.name} className="h-4" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-6 text-left pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-500 w-full sm:w-auto mb-2 sm:mb-0">Layanan Tambahan:</span>
                            {additionalServices.map(service => (
                                <div key={service.name} className="flex items-center gap-2">
                                    <img src={service.logoUrl} alt={service.name} className="h-[30px] w-auto" />
                                    <span className="text-xs">{service.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-200">
                 <div className="container mx-auto px-4 py-4 text-center text-sm text-slate-500">
                    <p>&copy; 2025 SEMI Marketplace. Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
                    <p className="text-xs mt-1">Powered by SEMI COMMUNITY X SPUBLIQ WEB</p>
                </div>
            </div>
        </footer>
    );
}
