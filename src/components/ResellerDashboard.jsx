import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Sub-Komponen untuk setiap Tampilan ---

// Tampilan Ringkasan Dashboard
const DashboardView = ({ openMessageModal }) => {
    const totalCommission = 2500000;
    const productsSold = 120;
    const conversionRate = "15%";
    const chartData = [
        { month: 'Jan', Komisi: 400000 },
        { month: 'Feb', Komisi: 300000 },
        { month: 'Mar', Komisi: 500000 },
        { month: 'Apr', Komisi: 450000 },
        { month: 'Mei', Komisi: 600000 },
        { month: 'Jun', Komisi: 250000 },
    ];

    const handleWithdraw = () => {
        openMessageModal('Penarikan Berhasil', 'Permintaan penarikan Anda berhasil diajukan dan sedang diproses.');
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800">Total Komisi</p>
                    <p className="text-2xl font-bold text-green-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCommission)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">Produk Terjual</p>
                    <p className="text-2xl font-bold text-blue-800">{productsSold}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                    <p className="text-sm text-purple-800">Tingkat Konversi</p>
                    <p className="text-2xl font-bold text-purple-800">{conversionRate}</p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4">Grafik Pendapatan Komisi (6 Bulan Terakhir)</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)} />
                            <Legend />
                            <Bar dataKey="Komisi" fill="#0d9488" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Tampilan Cari Produk
const SearchProductsView = ({ openMessageModal }) => (
    <div>
        <h3 className="text-xl font-bold mb-4">Cari Produk untuk Dijual</h3>
        <p>Fitur pencarian produk reseller akan tersedia di sini.</p>
        <button onClick={() => openMessageModal('Fitur Pencarian', 'Fitur pencarian produk reseller akan segera tersedia.')} className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Coba Fitur Ini</button>
    </div>
);

// Tampilan Produk Saya
const MyProductsView = ({ openMessageModal }) => {
     const myProducts = [
        { id: 1, name: "Kopi Gayo Arabika Premium", commission: "15%", imageUrl: "https://placehold.co/600x600/78350f/ffffff?text=Kopi+Gayo" },
        { id: 4, name: "Sambal Roa Khas Manado", commission: "20%", imageUrl: "https://placehold.co/600x600/b91c1c/ffffff?text=Sambal+Roa" },
    ];
    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Produk yang Anda Jual</h3>
             <div className="space-y-3">
                {myProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-md">
                        <img src={product.imageUrl} className="w-12 h-12 rounded-md object-cover" />
                        <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-green-600 font-semibold">Komisi: {product.commission}</p>
                        </div>
                        <button onClick={() => openMessageModal('Link Disalin', `Link affiliate untuk ${product.name} telah disalin ke clipboard.`)} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Dapatkan Link</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Tampilan Keuangan
const FinanceView = ({ openMessageModal }) => (
     <div>
        <h3 className="text-xl font-bold mb-4">Total Komisi & Penarikan Dana</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-800">Saldo Komisi</p>
                <p className="text-2xl font-bold text-blue-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(2500000)}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">Menunggu Pencairan</p>
                <p className="text-2xl font-bold text-yellow-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)}</p>
            </div>
        </div>
        <form className="space-y-3">
            <input type="number" placeholder="Jumlah Penarikan" className="w-full p-2.5 border rounded-md" />
            <select className="w-full p-2.5 border rounded-md bg-white">
                <option>Bank BCA - 1234567890 a/n Reseller</option>
            </select>
            <button onClick={() => openMessageModal('Penarikan Berhasil', 'Permintaan penarikan Anda berhasil diajukan dan sedang diproses.')} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Ajukan Penarikan</button>
        </form>
    </div>
);


// --- Komponen Utama Dashboard ---
export default function ResellerDashboard({ user, openMessageModal }) {
    const [activeView, setActiveView] = useState('dashboard');
    const [isProductMenuOpen, setProductMenuOpen] = useState(true);
    const [isFinanceMenuOpen, setFinanceMenuOpen] = useState(false);

    const renderContent = () => {
        switch(activeView) {
            case 'searchProducts':
                return <SearchProductsView openMessageModal={openMessageModal} />;
            case 'myProducts':
                return <MyProductsView openMessageModal={openMessageModal} />;
            case 'finance':
                return <FinanceView openMessageModal={openMessageModal} />;
            case 'dashboard':
            default:
                return <DashboardView openMessageModal={openMessageModal} />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard Reseller</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={`https://placehold.co/80x80/e2e8f0/475569?text=${user.displayName.charAt(0)}`} alt="Logo Pengguna" className="w-20 h-20 rounded-full" />
                            <div>
                                <h2 className="font-bold text-lg">{user.displayName}</h2>
                                <p className="text-sm text-slate-500">Reseller Aktif</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <button onClick={() => setActiveView('dashboard')} className={`w-full text-left p-2 rounded-lg ${activeView === 'dashboard' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Dashboard</button>
                            
                            <div>
                                <button onClick={() => setProductMenuOpen(!isProductMenuOpen)} className="w-full flex justify-between items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
                                    <span>Produk Reseller</span>
                                    <svg className={`w-4 h-4 transition-transform ${isProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {isProductMenuOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        <button onClick={() => setActiveView('searchProducts')} className={`block w-full text-left p-2 text-sm rounded-lg ${activeView === 'searchProducts' ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>Cari Produk</button>
                                        <button onClick={() => setActiveView('myProducts')} className={`block w-full text-left p-2 text-sm rounded-lg ${activeView === 'myProducts' ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>Produk Saya</button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button onClick={() => setFinanceMenuOpen(!isFinanceMenuOpen)} className="w-full flex justify-between items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
                                    <span>Keuangan</span>
                                    <svg className={`w-4 h-4 transition-transform ${isFinanceMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {isFinanceMenuOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        <button onClick={() => setActiveView('finance')} className={`block w-full text-left p-2 text-sm rounded-lg ${activeView === 'finance' ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>Total Komisi & Penarikan</button>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
