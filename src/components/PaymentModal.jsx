import React, { useState, useEffect } from 'react';

// Daftar metode pembayaran
const paymentMethods = [
    { id: 'online', name: 'Bayar Online', description: 'Kartu Kredit/Debit, VA, QRIS' },
    { id: 'cod', name: 'COD (Cash on delivery)', description: 'Bayar tunai saat barang tiba' },
    { id: 'cod_cek', name: 'COD Cek Dulu', description: 'Buka paket dulu baru bayar' },
];

// Data tiruan untuk pilihan ekspedisi
const shippingOptions = [
    { id: 'jne', name: 'JNE Reguler', price: 15000, eta: '2-3 hari' },
    { id: 'sicepat', name: 'SiCepat BEST', price: 18000, eta: '1-2 hari' },
    { id: 'gojek', name: 'GoSend Instant', price: 25000, eta: '2-3 jam' },
];

export default function PaymentModal({ isOpen, onClose, totalAmount, onFinalizeOrder, openMessageModal, user, cartItems }) {
    const [view, setView] = useState('selection'); // 'selection', 'details', 'ipaymu'
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

    const finalTotal = totalAmount + (selectedShipping?.price || 0);

    // Reset state setiap kali modal dibuka
    useEffect(() => {
        if (isOpen) {
            setView('selection');
            setSelectedMethod(null);
            setSelectedShipping(shippingOptions[0]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Menangani saat pengguna memilih metode pembayaran
    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
        setView('details');
    };

    // Menangani saat checkout akhir
    const handleCheckout = () => {
        if (selectedMethod.id === 'online') {
            setView('ipaymu');
        } else {
            // Langsung finalisasi untuk COD
            onFinalizeOrder(finalTotal, selectedMethod.name);
        }
    };
    
    // Menangani hasil simulasi iPaymu
    const handleIpaymuResult = (success) => {
        if (success) {
            onFinalizeOrder(finalTotal, `${selectedMethod.name} (iPaymu)`);
        } else {
            openMessageModal('Pembayaran Gagal', 'Pembayaran Anda gagal diproses. Silakan coba lagi.');
            setView('details'); // Kembali ke rincian
        }
    };

    // --- Tampilan Rincian Pesanan ---
    const renderDetailsView = () => (
        <>
            <div className="flex items-center p-5 border-b bg-white rounded-t-lg">
                <button onClick={() => setView('selection')} className="mr-4 text-xl hover:text-teal-600">←</button>
                <h3 className="text-xl font-bold text-slate-800">Rincian Pesanan</h3>
            </div>
            <div className="p-6 overflow-y-auto">
                {/* Item di Keranjang */}
                <div className="space-y-2 mb-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">{item.name} x{item.quantity}</span>
                            <span className="text-slate-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * item.quantity)}</span>
                        </div>
                    ))}
                </div>
                 {/* Pilihan Ekspedisi */}
                <div className="space-y-3 mb-4">
                    <h4 className="font-semibold text-slate-700">Pilihan Ekspedisi</h4>
                    {shippingOptions.map(opt => (
                        <button key={opt.id} onClick={() => setSelectedShipping(opt)} className={`w-full text-left p-3 border rounded-lg flex justify-between items-center transition-all ${selectedShipping.id === opt.id ? 'bg-teal-50 border-teal-500' : 'bg-white'}`}>
                            <div>
                                <p className="font-semibold">{opt.name}</p>
                                <p className="text-xs text-slate-500">Estimasi {opt.eta}</p>
                            </div>
                            <p className="font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(opt.price)}</p>
                        </button>
                    ))}
                </div>
                {/* Rincian Total */}
                <div className="bg-white p-4 rounded-lg border space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Subtotal</span><span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Ongkir</span><span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedShipping.price)}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span className="text-slate-800">Total</span><span className="text-teal-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(finalTotal)}</span></div>
                </div>
            </div>
            <div className="flex justify-end gap-4 p-5 mt-auto border-t bg-white rounded-b-lg">
                <button onClick={handleCheckout} className="w-full px-6 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">
                    Checkout
                </button>
            </div>
        </>
    );

    // --- Tampilan Simulasi iPaymu ---
    const renderIPaymuView = () => (
         <>
            <div className="p-5 border-b bg-white rounded-t-lg">
                <h3 className="text-xl font-bold text-slate-800 text-center">Simulasi iPaymu</h3>
            </div>
            <div className="p-6 text-center flex flex-col justify-center items-center flex-grow">
                <p className="mb-2">Anda akan membayar sebesar:</p>
                <p className="text-3xl font-bold text-teal-600 mb-6">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(finalTotal)}</p>
                <p className="text-sm text-slate-500 mb-6">Silakan selesaikan pembayaran. Ini adalah halaman simulasi.</p>
                <div className="w-full space-y-3">
                    <button onClick={() => handleIpaymuResult(true)} className="w-full px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">Verifikasi Pembayaran Sukses</button>
                    <button onClick={() => handleIpaymuResult(false)} className="w-full px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Verifikasi Pembayaran Gagal</button>
                </div>
            </div>
        </>
    );

    // --- Tampilan Awal Pemilihan Metode ---
    const renderSelectionView = () => (
        <>
            <div className="flex justify-between items-center p-5 border-b bg-white rounded-t-lg">
                <h3 className="text-xl font-bold text-slate-800">Pilih Pembayaran</h3>
                <button onClick={onClose} className="text-3xl font-light leading-none p-1 text-slate-500 hover:text-slate-800">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
                <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Total Tagihan</span>
                        <span className="font-bold text-xl text-teal-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <h4 className="font-semibold text-slate-700">Metode Pembayaran</h4>
                    {paymentMethods.map((method) => (
                        <button key={method.id} onClick={() => handleMethodSelect(method)} className="w-full text-left p-4 border rounded-lg flex items-center gap-4 transition-all duration-200 bg-white hover:bg-slate-100 border-slate-200">
                            <div className="flex-1">
                                <p className="font-semibold text-slate-800">{method.name}</p>
                                <p className="text-xs text-slate-500">{method.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-50 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
                {view === 'selection' && renderSelectionView()}
                {view === 'details' && renderDetailsView()}
                {view === 'ipaymu' && renderIPaymuView()}
            </div>
        </div>
    );
}
