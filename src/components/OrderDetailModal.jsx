import React from 'react';

// Komponen modal untuk melihat detail pesanan
export default function OrderDetailModal({ isOpen, onClose, order, allProducts, allSellers }) {
    if (!isOpen || !order) return null;

    const findProduct = (productId) => allProducts.find(p => p.id === productId);
    const findSeller = (sellerId) => allSellers.find(s => s.id === sellerId);

    const seller = findSeller(order.sellerId);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Detail Pesanan #{order.id}</h3>
                <div className="space-y-2 text-sm border-b pb-4 mb-4">
                    <p><strong>Pelanggan:</strong> {order.customer}</p>
                    <p><strong>Tanggal:</strong> {order.date}</p>
                    <p><strong>Penjual:</strong> {seller ? seller.name : 'N/A'}</p>
                    <p><strong>Total:</strong> Rp {order.total.toLocaleString('id-ID')}</p>
                    <p><strong>Status:</strong> <span className="font-semibold px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{order.status}</span></p>
                </div>
                <h4 className="font-semibold mb-2">Item Pesanan:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm max-h-48 overflow-y-auto">
                    {order.items.map((item, index) => {
                        const product = findProduct(item.productId);
                        return (
                            <li key={index}>
                                {product ? product.name : `Produk ID: ${item.productId}`} - <strong>{item.quantity} pcs</strong>
                            </li>
                        );
                    })}
                </ul>
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100">Tutup</button>
                </div>
            </div>
        </div>
    );
}
