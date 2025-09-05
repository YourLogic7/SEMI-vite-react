import React from 'react';

// Komponen untuk modal keranjang belanja
export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
    if (!isOpen) return null;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Keranjang Belanja</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-slate-500 text-center">Keranjang Anda masih kosong.</p>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center gap-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-slate-500">{item.quantity} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Hapus</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="p-5 border-t bg-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-lg">Total:</span>
                            <span className="font-bold text-xl text-teal-600">{formattedTotal}</span>
                        </div>
                        <button onClick={onCheckout} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700">Lanjut ke Pembayaran</button>
                    </div>
                )}
            </div>
        </div>
    );
}
