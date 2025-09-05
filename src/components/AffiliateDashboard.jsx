import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Sub-Komponen untuk setiap Tampilan ---

// Tampilan Ringkasan Dashboard
const DashboardView = ({ user, openMessageModal }) => {
    const totalCommission = 1850000;
    const totalClicks = 2540;
    const conversionRate = "8%";
    const affiliateLink = `https://semi-marketplace.com/ref/${user.displayName}`;
    const chartData = [
        { month: 'Jan', Komisi: 250000 },
        { month: 'Feb', Komisi: 150000 },
        { month: 'Mar', Komisi: 300000 },
        { month: 'Apr', Komisi: 280000 },
        { month: 'Mei', Komisi: 450000 },
        { month: 'Jun', Komisi: 420000 },
    ];
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(affiliateLink);
        openMessageModal('Link Disalin', 'Link affiliate utama Anda telah disalin ke clipboard.');
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800">Total Komisi</p>
                    <p className="text-2xl font-bold text-green-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCommission)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">Total Klik</p>
                    <p className="text-2xl font-bold text-blue-800">{totalClicks}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                    <p className="text-sm text-purple-800">Tingkat Konversi</p>
                    <p className="text-2xl font-bold text-purple-800">{conversionRate}</p>
                </div>
            </div>
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Link Affiliate Utama Anda</h3>
                <div className="bg-slate-100 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-teal-600 font-mono text-sm md:text-base break-all">{affiliateLink}</span>
                    <button onClick={handleCopyClick} className="px-3 py-1 text-xs font-semibold bg-teal-600 text-white rounded-md hover:bg-teal-700">Salin</button>
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

// Tampilan Laporan Link
const LinkReportView = () => {
    const topPerformingLinks = [
        { id: 1, name: "Link Promo Kopi Gayo", clicks: 850, sales: 30, commission: 750000 },
        { id: 2, name: "Link Sambal Roa Instagram", clicks: 620, sales: 25, commission: 550000 },
        { id: 3, name: "Link Batik Tulis Facebook", clicks: 450, sales: 15, commission: 350000 },
    ];
    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Laporan Kinerja Link</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3">Nama Link</th>
                            <th className="p-3">Klik</th>
                            <th className="p-3">Penjualan</th>
                            <th className="p-3">Komisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topPerformingLinks.map(link => (
                            <tr key={link.id} className="border-b">
                                <td className="p-3 font-semibold">{link.name}</td>
                                <td className="p-3">{link.clicks}</td>
                                <td className="p-3">{link.sales}</td>
                                <td className="p-3">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(link.commission)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Tampilan Keuangan
const FinanceView = () => (
     <div>
        <h3 className="text-xl font-bold mb-4">Total Komisi & Penarikan Dana</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-800">Saldo Komisi</p>
                <p className="text-2xl font-bold text-blue-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(2500000)}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">Menunggu Pencairan</p>
                <p className="text-2xl font-bold text-yellow-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)}</p>
            </div>
        </div>
        <form className="space-y-3">
            <input type="number" placeholder="Jumlah Penarikan" className="w-full p-2.5 border rounded-md" />
            <select className="w-full p-2.5 border rounded-md bg-white">
                <option>Bank BCA - 1234567890 a/n Affiliate</option>
            </select>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Ajukan Penarikan</button>
        </form>
    </div>
);


// --- Komponen Utama Dashboard ---
export default function AffiliateDashboard({ user, openMessageModal }) {
    const [activeView, setActiveView] = useState('dashboard');
    const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(true);
    const [isFinanceMenuOpen, setFinanceMenuOpen] = useState(false);

    const renderContent = () => {
        switch(activeView) {
            case 'linkReport':
                return <LinkReportView />;
            case 'finance':
                return <FinanceView />;
            case 'dashboard':
            default:
                return <DashboardView user={user} openMessageModal={openMessageModal} />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard Affiliate</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={`https://placehold.co/80x80/e2e8f0/475569?text=${user.displayName.charAt(0)}`} alt="Logo Pengguna" className="w-20 h-20 rounded-full" />
                            <div>
                                <h2 className="font-bold text-lg">{user.displayName}</h2>
                                <p className="text-sm text-slate-500">Affiliate Aktif</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <button onClick={() => setActiveView('dashboard')} className={`flex items-center w-full text-left gap-3 p-2 rounded-lg ${activeView === 'dashboard' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Dashboard</button>
                            
                            <div>
                                <button onClick={() => setIsLinkMenuOpen(!isLinkMenuOpen)} className="w-full flex justify-between items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
                                    <span>Link Affiliate</span>
                                    <svg className={`w-4 h-4 transition-transform ${isLinkMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {isLinkMenuOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        <button onClick={() => openMessageModal('Fitur Tidak Tersedia', 'Fitur ini akan segera tersedia!')} className="block w-full text-left p-2 text-sm rounded-lg hover:bg-slate-50">Buat Link Kustom</button>
                                        <button onClick={() => setActiveView('linkReport')} className={`block w-full text-left p-2 text-sm rounded-lg ${activeView === 'linkReport' ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>Laporan Link</button>
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

