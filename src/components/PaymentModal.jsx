import React from 'react';
import api from '../api';

export default function PaymentModal({ isOpen, onClose, totalAmount, onFinalizeOrder, openMessageModal, cartItems, user }) {
    if (!isOpen) return null;

    const handlePayment = async (method) => {
        try {
            const order_id = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            const gross_amount = Math.round(totalAmount);

            const item_details = cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: Math.round(item.price),
                quantity: item.quantity,
            }));

            // Calculate subtotal from items and find the difference for shipping/other fees
            const subtotal = item_details.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            const otherFees = gross_amount - subtotal;

            if (otherFees > 0) {
                item_details.push({
                    id: 'SHIPPING_FEE',
                    name: 'Biaya Pengiriman & Lainnya',
                    price: otherFees,
                    quantity: 1,
                });
            }

            const customer_details = {
                first_name: user.name,
                email: user.email,
                phone: user.noHandphone || '081234567890',
            };

            const response = await api.post('/api/midtrans/create-transaction', {
                order_id,
                gross_amount,
                item_details,
                customer_details,
            });

            const snapToken = response.data.token;

            window.snap.pay(snapToken, {
                onSuccess: function(result){
                    /* You may add your own implementation here */
                    openMessageModal('Pembayaran Berhasil', 'Transaksi berhasil! Pesanan Anda sedang diproses.');
                    onFinalizeOrder(totalAmount, 'Midtrans'); // Pass method as 'Midtrans'
                    onClose();
                    console.log(result);
                },
                onPending: function(result){
                    /* You may add your own implementation here */
                    openMessageModal('Pembayaran Tertunda', 'Transaksi Anda sedang menunggu pembayaran.');
                    onFinalizeOrder(totalAmount, 'Midtrans'); // Still finalize, but status will be pending
                    onClose();
                    console.log(result);
                },
                onError: function(result){
                    /* You may add your own implementation here */
                    openMessageModal('Pembayaran Gagal', 'Terjadi kesalahan saat memproses pembayaran.');
                    console.log(result);
                },
                onClose: function(){
                    /* You may add your own implementation here */
                    openMessageModal('Pembayaran Dibatalkan', 'Anda menutup jendela pembayaran.');
                }
            });

        } catch (error) {
            console.error("Error initiating Midtrans payment:", error.response?.data || error.message);
            openMessageModal('Pembayaran Gagal', error.response?.data?.message || 'Gagal memulai pembayaran Midtrans. Silakan coba lagi.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Pilih Metode Pembayaran</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-lg font-bold">Total Pembayaran: Rp{totalAmount.toLocaleString('id-ID')}</p>
                    <button
                        onClick={() => handlePayment('Midtrans')}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Bayar dengan Midtrans
                    </button>
                </div>
            </div>
        </div>
    );
}
