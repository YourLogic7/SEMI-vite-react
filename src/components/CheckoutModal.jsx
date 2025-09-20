import React from 'react';

// Komponen untuk modal checkout
export default function CheckoutModal({ isOpen, onClose, cartItems, user, onProceedToPayment }) {
    if (!isOpen) return null;

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = 15000; // Contoh biaya ongkir
    const total = subtotal + shippingCost;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Checkout</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {/* Konten form checkout bisa ditambahkan di sini */}
                    <h4 className="font-semibold mb-4">Rincian Pesanan</h4>
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Ongkos Kirim</span>
                            <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Total Pembayaran</span>
                            <span className="text-teal-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t">
                    <button onClick={() => onProceedToPayment(total)} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700">Pilih Pembayaran</button>
                </div>
            </div>
        </div>
    );
}
