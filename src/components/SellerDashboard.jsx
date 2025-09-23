import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddProductModal from './AddProductModal'; 
import ProcessOrderModal from './ProcessOrderModal';
import CreateVoucherModal from './CreateVoucherModal';

// --- Sub-Komponen untuk setiap Tampilan ---

const DashboardView = ({ products, orders }) => {
    const totalSales = orders.filter(o => o.status === 'Selesai').reduce((sum, order) => sum + order.total, 0);
    const newOrdersCount = orders.filter(o => o.status === 'Diproses').length;
    const chartData = products.slice(0, 5).map(p => ({ name: p.name.substring(0, 10) + '...', Terjual: p.sold }));
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800">Total Penjualan</p>
                    <p className="text-2xl font-bold text-green-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalSales)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">Produk Aktif</p>
                    <p className="text-2xl font-bold text-blue-800">{products.length}</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                    <p className="text-sm text-orange-800">Pesanan Baru</p>
                    <p className="text-2xl font-bold text-orange-800">{newOrdersCount}</p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4">Analisis Produk Terlaris</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Terjual" fill="#0d9488" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const ProductListView = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Daftar Produk Anda</h3>
            <button onClick={onAddProduct} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Tambah Produk</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="p-3">Produk</th>
                        <th className="p-3">Harga</th>
                        <th className="p-3">Stok</th>
                        <th className="p-3">Terjual</th>
                        <th className="p-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-b">
                            <td className="p-3 flex items-center gap-3">
                                <img src={p.imageUrl} className="w-10 h-10 rounded-md object-cover" />
                                <span>{p.name}</span>
                            </td>
                            <td className="p-3">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p.price)}</td>
                            <td className="p-3">{p.stock}</td>
                            <td className="p-3">{p.sold}</td>
                            <td className="p-3 space-x-2">
                                <button onClick={() => onEditProduct(p)} className="font-semibold text-teal-600">Ubah</button>
                                <button onClick={() => onDeleteProduct(p.id)} className="font-semibold text-red-600">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const IncomingOrdersView = ({ orders, onProcessOrder }) => {
    const incomingOrders = orders.filter(o => o.status === 'Diproses');
    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Pesanan Masuk ({incomingOrders.length})</h3>
            {incomingOrders.length > 0 ? (
                <div className="space-y-4">
                    {incomingOrders.map(order => (
                        <div key={order.id} className="bg-slate-50 p-4 rounded-lg border">
                            <div className="flex justify-between items-center border-b pb-2 mb-3">
                                <div>
                                    <p className="font-bold text-teal-600">{order.id}</p>
                                    <p className="text-xs text-slate-500">Pelanggan: {order.customer}</p>
                                </div>
                                <span className="text-sm font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(order.total)}</span>
                            </div>
                            <div className="text-right mt-4">
                                <button onClick={() => onProcessOrder(order.id)} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Proses Pesanan</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p>Tidak ada pesanan masuk saat ini.</p>)}
        </div>
    );
};

const VoucherView = ({ vouchers, onAddVoucher }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Promosi & Voucher</h3>
            <button onClick={onAddVoucher} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Buat Voucher Baru</button>
        </div>
        <div className="space-y-3">
            {vouchers.length > 0 ? vouchers.map((v, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-md border flex justify-between items-center">
                    <div>
                        <p className="font-bold text-teal-600">{v.code}</p>
                        <p className="text-sm text-slate-600">{v.type} - {v.type === 'Persentase' ? `${v.value}%` : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v.value)}</p>
                    </div>
                    <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">Aktif</span>
                </div>
            )) : <p>Belum ada voucher yang dibuat.</p>}
        </div>
    </div>
);

// --- PERBAIKAN DI SINI: Komponen Keuangan Dirombak Total ---
const FinanceView = ({ openMessageModal, user }) => {
    const [balance, setBalance] = useState(1500000);
    const [mutations, setMutations] = useState([
        { date: '2025-08-18', desc: 'Penjualan ORD-001', type: 'credit', amount: 165000 },
        { date: '2025-08-17', desc: 'Penarikan Dana', type: 'debit', amount: 500000 },
        { date: '2025-08-15', desc: 'Penjualan ORD-002', type: 'credit', amount: 450000 },
    ]);
    const [withdrawal, setWithdrawal] = useState({
        bank: '',
        accountName: user?.name || '',
        amount: ''
    });

    const handleWithdrawalChange = (e) => {
        setWithdrawal({ ...withdrawal, [e.target.name]: e.target.value });
    };

    const handleWithdrawal = (e) => {
        e.preventDefault();
        const amount = parseInt(withdrawal.amount, 10);
        if (amount > balance) {
            openMessageModal('Gagal', 'Saldo tidak mencukupi untuk melakukan penarikan.');
            return;
        }
        
        setBalance(prev => prev - amount);
        setMutations(prev => [{ date: new Date().toISOString().slice(0, 10), desc: 'Penarikan Dana', type: 'debit', amount }, ...prev]);
        openMessageModal('Penarikan Berhasil', `Penarikan dana sebesar ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)} sedang diproses.`);
        setWithdrawal({ bank: '', accountName: user?.name || '', amount: '' });
    };

    const bankList = ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga", "Danamon", "PermataBank", "Bank Lainnya"];

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Pendapatan & Penarikan</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800">Saldo Tersedia</p>
                    <p className="text-2xl font-bold text-green-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(balance)}</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                    <p className="text-sm text-orange-800">Total Penarikan</p>
                    <p className="text-2xl font-bold text-orange-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(mutations.filter(m => m.type === 'debit').reduce((sum, m) => sum + m.amount, 0))}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold mb-2">Ajukan Penarikan Dana</h4>
                    <form onSubmit={handleWithdrawal} className="space-y-3 bg-slate-50 p-4 rounded-md">
                        <div><label className="text-xs">2. Daftar Rekening Bank</label><select name="bank" value={withdrawal.bank} onChange={handleWithdrawalChange} className="w-full p-2 border rounded-md bg-white mt-1" required><option value="">Pilih Bank</option>{bankList.map(b => <option key={b}>{b}</option>)}</select></div>
                        <div><label className="text-xs">3. Nama Pemilik Rekening</label><input name="accountName" value={withdrawal.accountName} onChange={handleWithdrawalChange} type="text" className="w-full p-2 border rounded-md mt-1" required /></div>
                        <div><label className="text-xs">4. Jumlah Penarikan</label><input name="amount" value={withdrawal.amount} onChange={handleWithdrawalChange} type="number" placeholder="Rp 0" className="w-full p-2 border rounded-md mt-1" required /></div>
                        <button type="submit" className="w-full px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Ajukan Penarikan</button>
                    </form>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">1. Mutasi Pendapatan & Penarikan</h4>
                    <div className="border rounded-md max-h-64 overflow-y-auto">
                        {mutations.map((m, i) => (
                            <div key={i} className={`flex justify-between items-center p-2 text-xs ${i > 0 ? 'border-t' : ''}`}>
                                <div>
                                    <p className="font-semibold">{m.desc}</p>
                                    <p className="text-slate-500">{m.date}</p>
                                </div>
                                <p className={`font-bold ${m.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                    {m.type === 'credit' ? '+' : '-'} {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(m.amount)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PERBAIKAN DI SINI: Komponen Pengaturan Toko Dirombak Total ---
const StoreSettingsView = ({ user, openMessageModal }) => {
    const [formData, setFormData] = useState({
        storeName: user?.displayName || '',
        ownerName: user?.name || '',
        whatsapp: '081234567890', // Dummy
        nib: '1234567890123', // Dummy
        ktpAddress: 'Jl. Merdeka No. 17, Yogyakarta', // Dummy
        isLocationSame: true,
        expeditions: ['Papaket', 'JNE'] // Dummy
    });
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json').then(res => res.json()).then(setProvinces);
    }, []);
    useEffect(() => {
        if (selectedProvince) fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`).then(res => res.json()).then(setRegencies);
    }, [selectedProvince]);
    useEffect(() => {
        if (selectedRegency) fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`).then(res => res.json()).then(setDistricts);
    }, [selectedRegency]);
    useEffect(() => {
        if (selectedDistrict) fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`).then(res => res.json()).then(setVillages);
    }, [selectedDistrict]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name !== 'isLocationSame') {
            const currentExpeditions = formData.expeditions;
            if (checked) {
                setFormData(prev => ({ ...prev, expeditions: [...currentExpeditions, value] }));
            } else {
                setFormData(prev => ({ ...prev, expeditions: currentExpeditions.filter(exp => exp !== value) }));
            }
        } else if (type === 'checkbox' && name === 'isLocationSame') {
            setFormData(prev => ({ ...prev, isLocationSame: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        openMessageModal('Berhasil', 'Pengaturan toko berhasil diperbarui.');
    };

    const expeditionList = ["Papaket", "JNE", "JNT", "Sicepat", "Anteraja", "Ninja Express", "SPX", "Indah Cargo", "JNT Cargo", "Pos Ind", "SIPMEN"];

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Pengaturan Toko</h3>
            <form onSubmit={handleSaveSettings} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="font-semibold">1. Nama Toko</label><input name="storeName" value={formData.storeName} onChange={handleChange} type="text" className="w-full p-2 border rounded-md mt-1" required /></div>
                    <div><label className="font-semibold">2. Pemilik Toko</label><input name="ownerName" value={formData.ownerName} onChange={handleChange} type="text" className="w-full p-2 border rounded-md mt-1" required /></div>
                    <div><label className="font-semibold">3. No Whatsapp Aktif</label><input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full p-2 border rounded-md mt-1" required /></div>
                    <div><label className="font-semibold">4. No NIB</label><input name="nib" value={formData.nib} onChange={handleChange} type="text" className="w-full p-2 border rounded-md mt-1" /></div>
                </div>
                <div><label className="font-semibold">6. Alamat KTP</label><textarea name="ktpAddress" value={formData.ktpAddress} onChange={handleChange} rows="2" className="w-full p-2 border rounded-md mt-1"></textarea></div>
                <div>
                    <label className="font-semibold">5. Lokasi Toko</label>
                    <div className="flex items-center gap-2 mt-1"><input type="checkbox" id="isLocationSame" name="isLocationSame" checked={formData.isLocationSame} onChange={handleChange} /><label htmlFor="isLocationSame">Sama dengan alamat KTP</label></div>
                    {!formData.isLocationSame && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 border p-3 rounded-md">
                            <select onChange={(e) => setSelectedProvince(e.target.value)} className="w-full p-2 border rounded-md bg-white"><option value="">Provinsi</option>{provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                            <select onChange={(e) => setSelectedRegency(e.target.value)} className="w-full p-2 border rounded-md bg-white" disabled={!selectedProvince}><option value="">Kota/Kab.</option>{regencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
                            <select onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full p-2 border rounded-md bg-white" disabled={!selectedRegency}><option value="">Kecamatan</option>{districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
                            <select className="w-full p-2 border rounded-md bg-white" disabled={!selectedDistrict}><option value="">Kelurahan</option>{villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select>
                            <input type="text" placeholder="Kode Pos" className="w-full p-2 border rounded-md" />
                        </div>
                    )}
                </div>
                <div><label className="font-semibold">7. Upload Ubah Logo Dashboard Toko</label><input type="file" className="w-full text-xs mt-1" /></div>
                <div>
                    <label className="font-semibold">8. Aktifkan Kurir Ekspedisi</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {expeditionList.map(exp => (
                            <label key={exp}><input type="checkbox" value={exp} checked={formData.expeditions.includes(exp)} onChange={handleChange} className="mr-2" />{exp}</label>
                        ))}
                    </div>
                </div>
                <div className="pt-4 border-t mt-4">
                    <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    );
};

// --- PERBAIKAN DI SINI: Komponen Pendaftaran Mitra Kurir Dirombak Total ---
const CourierRegistrationView = ({ openMessageModal }) => {
    const [formData, setFormData] = useState({ vehicle: 'Motor' });
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegency, setSelectedRegency] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeResponsibility, setAgreeResponsibility] = useState(false);

    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(res => res.json())
            .then(setProvinces);
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
                .then(res => res.json())
                .then(setRegencies);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedRegency) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
                .then(res => res.json())
                .then(setDistricts);
        }
    }, [selectedRegency]);
    
    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
                .then(res => res.json())
                .then(setVillages);
        }
    }, [selectedDistrict]);

    const handleRegisterCourier = (e) => {
        e.preventDefault();
        openMessageModal('Pengajuan Terkirim', 'Data anda sudah kami rekam, mohon tunggu 7x24 jam untuk verifikasi data.');
    };
    
    const isSubmitDisabled = !agreeTerms || !agreeResponsibility;

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Daftar Mitra Kurir</h3>
            <form onSubmit={handleRegisterCourier} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="font-semibold">1. Nama Lengkap</label><input type="text" className="w-full p-2 border rounded-md mt-1" required /></div>
                    <div><label className="font-semibold">2. NIK</label><input type="text" className="w-full p-2 border rounded-md mt-1" required /></div>
                </div>
                <div><label className="font-semibold">3. Alamat Lengkap</label><textarea rows="3" className="w-full p-2 border rounded-md mt-1" required></textarea></div>
                <div>
                    <label className="font-semibold">4. Wilayah</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
                        <select onChange={(e) => setSelectedProvince(e.target.value)} className="w-full p-2 border rounded-md bg-white"><option value="">Provinsi</option>{provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                        <select onChange={(e) => setSelectedRegency(e.target.value)} className="w-full p-2 border rounded-md bg-white" disabled={!selectedProvince}><option value="">Kota/Kab.</option>{regencies.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
                        <select onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full p-2 border rounded-md bg-white" disabled={!selectedRegency}><option value="">Kecamatan</option>{districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">5. Jenis Kendaraan</label>
                        <div className="flex gap-4 mt-2"><label><input type="radio" name="vehicle" value="Motor" checked={formData.vehicle === 'Motor'} onChange={(e) => setFormData({...formData, vehicle: e.target.value})} /> Motor</label><label><input type="radio" name="vehicle" value="Mobil" checked={formData.vehicle === 'Mobil'} onChange={(e) => setFormData({...formData, vehicle: e.target.value})} /> Mobil</label></div>
                    </div>
                    <div><label className="font-semibold">6. No. Polisi</label><input type="text" className="w-full p-2 border rounded-md mt-1" required /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className="font-semibold">7. Upload Foto Diri</label><input type="file" className="w-full text-xs mt-1" /></div>
                    <div><label className="font-semibold">8. Upload STNK</label><input type="file" className="w-full text-xs mt-1" /></div>
                    <div><label className="font-semibold">9. Upload Foto Kendaraan</label><input type="file" className="w-full text-xs mt-1" /></div>
                </div>
                <div className="mt-6 space-y-3 border-t pt-4">
                    <label className="flex items-start"><input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} className="mt-1 mr-2" /><span className="text-slate-600">Dengan ini saya menyatakan data yang saya berikan sudah sesuai dengan Term & Condition yang SEMI berikan.</span></label>
                    <label className="flex items-start"><input type="checkbox" checked={agreeResponsibility} onChange={() => setAgreeResponsibility(!agreeResponsibility)} className="mt-1 mr-2" /><span className="text-slate-600">Saya bertanggung jawab atas semua pengiriman dan tidak melibatkan SEMI sebagai penanggung jawab utama.</span></label>
                </div>
                <button type="submit" disabled={isSubmitDisabled} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-teal-700 disabled:bg-slate-400">Kirim Pengajuan</button>
            </form>
        </div>
    );
};

// --- Komponen Utama Dashboard ---
export default function SellerDashboard({ user, products, orders, onSaveProduct, onDeleteProduct, onUpdateOrder, openMessageModal }) {
    const [activeView, setActiveView] = useState('dashboard');
    const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
    const [isProcessOrderModalOpen, setIsProcessOrderModalOpen] = useState(false);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [processingOrderId, setProcessingOrderId] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [vouchers, setVouchers] = useState([
        { code: 'DISKONAGUSTUS', type: 'Persentase', value: 17 },
        { code: 'MERDEKA10K', type: 'Potongan Harga', value: 10000 }
    ]);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setAddProductModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setAddProductModalOpen(true);
    };
    
    const handleProcessOrderClick = (orderId) => {
        setProcessingOrderId(orderId);
        setIsProcessOrderModalOpen(true);
    };

    const handleConfirmProcessOrder = (orderId, resi) => {
        onUpdateOrder(orderId, 'Dikirim', resi);
        setIsProcessOrderModalOpen(false);
        openMessageModal('Berhasil', `Pesanan ${orderId} telah diproses dengan resi ${resi}.`);
    };

    const handleSaveVoucher = (voucherData) => {
        setVouchers([...vouchers, voucherData]);
        setIsVoucherModalOpen(false);
        openMessageModal('Berhasil', `Voucher ${voucherData.code} berhasil dibuat!`);
    };

    const renderContent = () => {
        switch(activeView) {
            case 'products':
                return <ProductListView products={products} onAddProduct={handleAddProduct} onEditProduct={handleEditProduct} onDeleteProduct={onDeleteProduct} />;
            case 'incomingOrders':
                return <IncomingOrdersView orders={orders} onProcessOrder={handleProcessOrderClick} />;
            case 'vouchers':
                return <VoucherView vouchers={vouchers} onAddVoucher={() => setIsVoucherModalOpen(true)} />;
            case 'finance':
                return <FinanceView openMessageModal={openMessageModal} />;
            case 'settings':
                return <StoreSettingsView user={user} openMessageModal={openMessageModal} />;
            case 'courier':
                return <CourierRegistrationView openMessageModal={openMessageModal} />;
            default:
                return <DashboardView products={products} orders={orders} />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard Toko</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={`https://placehold.co/80x80/e2e8f0/475569?text=${user?.displayName?.charAt(0)}`} alt="Logo Toko" className="w-20 h-20 rounded-full" />
                            <div>
                                <h2 className="font-bold text-lg">Toko {user?.displayName}</h2>
                                <p className="text-sm text-slate-500">Penjual Aktif</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <button onClick={() => setActiveView('dashboard')} className={`w-full text-left p-2 rounded-lg ${activeView === 'dashboard' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Dashboard</button>
                            <button onClick={() => setActiveView('products')} className={`w-full text-left p-2 rounded-lg ${activeView === 'products' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Manajemen Produk</button>
                            <button onClick={() => setActiveView('incomingOrders')} className={`w-full text-left p-2 rounded-lg ${activeView === 'incomingOrders' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Pengelolaan Pesanan</button>
                            <button onClick={() => setActiveView('vouchers')} className={`w-full text-left p-2 rounded-lg ${activeView === 'vouchers' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Promosi & Voucher</button>
                            <button onClick={() => setActiveView('finance')} className={`w-full text-left p-2 rounded-lg ${activeView === 'finance' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Keuangan</button>
                            <button onClick={() => setActiveView('settings')} className={`w-full text-left p-2 rounded-lg ${activeView === 'settings' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Pengaturan Toko</button>
                            <button onClick={() => setActiveView('courier')} className={`w-full text-left p-2 rounded-lg ${activeView === 'courier' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Daftar Mitra Kurir</button>
                        </nav>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {renderContent()}
                    </div>
                </div>
            </div>

            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => setAddProductModalOpen(false)}
                onSave={(product) => {
                    onSaveProduct(product);
                    setAddProductModalOpen(false);
                }}
                productToEdit={editingProduct}
                openMessageModal={openMessageModal}
                user={user}
            />

            <ProcessOrderModal 
                isOpen={isProcessOrderModalOpen}
                onClose={() => setIsProcessOrderModalOpen(false)}
                onConfirm={handleConfirmProcessOrder}
                orderId={processingOrderId}
                openMessageModal={openMessageModal}
            />
            
            <CreateVoucherModal
                isOpen={isVoucherModalOpen}
                onClose={() => setIsVoucherModalOpen(false)}
                onSave={handleSaveVoucher}
            />
        </div>
    );
}
