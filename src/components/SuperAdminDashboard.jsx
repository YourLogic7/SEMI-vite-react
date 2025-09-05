import React, { useState } from 'react';
import ProductEditModal from './ProductEditModal';
import OrderDetailModal from './OrderDetailModal';
import ConfirmationModal from './ConfirmationModal';

// Komponen utama untuk Dashboard Super Admin yang sudah fungsional
export default function SuperAdminDashboard({ 
    allUsers, allProducts, allSellers, allOrders, 
    onBroadcastNotification, onSaveProduct, onDeleteProduct, onUpdateOrderStatus, onDeleteUser,
    openMessageModal, openConfirmModal // Menerima props baru
}) {
    const [activeTab, setActiveTab] = useState('overview');
    const [notificationMessage, setNotificationMessage] = useState('');

    // State untuk modal
    const [isProductModalOpen, setProductModalOpen] = useState(false);
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);
    
    // State untuk menyimpan data yang sedang di-handle
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Handler untuk notifikasi
    const handleSendNotification = () => {
        if (notificationMessage.trim()) {
            onBroadcastNotification(notificationMessage);
            setNotificationMessage('');
            openMessageModal("Berhasil", "Notifikasi broadcast berhasil dikirim!");
        } else {
            openMessageModal("Peringatan", "Pesan notifikasi tidak boleh kosong.");
        }
    };

    // Handler untuk produk
    const handleAddProduct = () => {
        setSelectedProduct(null);
        setProductModalOpen(true);
    };
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setProductModalOpen(true);
    };
    const handleDeleteProductClick = (productId) => {
        openConfirmModal('Hapus Produk', 'Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.', () => onDeleteProduct(productId));
    };

    // Handler untuk pesanan
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setOrderModalOpen(true);
    };
    const handleUpdateStatus = (orderId, newStatus) => {
        onUpdateOrderStatus(orderId, newStatus);
    };

    // Handler untuk pengguna
    const handleDeleteUserClick = (userId) => {
        openConfirmModal('Hapus Pengguna', 'Apakah Anda yakin ingin menghapus pengguna ini?', () => onDeleteUser(userId));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Manajemen Pengguna ({allUsers.length})</h2>
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {allUsers.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4 capitalize">{user.role || 'Customer'}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleDeleteUserClick(user.id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'products':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Manajemen Produk ({allProducts.length})</h2>
                            <button onClick={handleAddProduct} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 text-sm">Tambah Produk</button>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Produk</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Harga</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stok</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {allProducts.map(product => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4">Rp {product.price.toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4 space-x-4 text-sm">
                                                <button onClick={() => handleEditProduct(product)} className="text-teal-600 hover:text-teal-800">Edit</button>
                                                <button onClick={() => handleDeleteProductClick(product.id)} className="text-red-600 hover:text-red-800">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Manajemen Pesanan ({allOrders.length})</h2>
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Pelanggan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {allOrders.map(order => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                                            <td className="px-6 py-4">{order.customer}</td>
                                            <td className="px-6 py-4">Rp {order.total.toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4">
                                                <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)} className="p-1 text-xs border rounded-md bg-white focus:ring-teal-500 focus:border-teal-500">
                                                    <option>Diproses</option>
                                                    <option>Dikirim</option>
                                                    <option>Selesai</option>
                                                    <option>Dibatalkan</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleViewOrder(order)} className="text-teal-600 hover:text-teal-800 text-sm">Lihat Detail</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                     <div>
                        <h2 className="text-xl font-semibold mb-4">Kirim Notifikasi Broadcast</h2>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <textarea
                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                rows="4"
                                placeholder="Tulis pesan pengumuman atau promo di sini..."
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                            ></textarea>
                            <button
                                onClick={handleSendNotification}
                                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                            >
                                Kirim ke Semua Pengguna
                            </button>
                        </div>
                    </div>
                );
            case 'overview':
            default:
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Ringkasan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-slate-500">Total Pengguna</h3>
                                <p className="text-3xl font-bold">{allUsers.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-slate-500">Total Produk</h3>
                                <p className="text-3xl font-bold">{allProducts.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-slate-500">Total Pesanan</h3>
                                <p className="text-3xl font-bold">{allOrders.length}</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const TabButton = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabName ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard Super Admin</h1>
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-2">
                <TabButton tabName="overview" label="Ringkasan" />
                <TabButton tabName="users" label="Pengguna" />
                <TabButton tabName="products" label="Produk" />
                <TabButton tabName="orders" label="Pesanan" />
                <TabButton tabName="notifications" label="Notifikasi" />
            </div>
            <div>
                {renderContent()}
            </div>

            {/* Modals dipanggil di sini, tapi dikontrol dari App.jsx */}
            <ProductEditModal 
                isOpen={isProductModalOpen} 
                onClose={() => setProductModalOpen(false)} 
                onSave={onSaveProduct} 
                product={selectedProduct} 
                sellers={allSellers} 
            />
            <OrderDetailModal 
                isOpen={isOrderModalOpen} 
                onClose={() => setOrderModalOpen(false)} 
                order={selectedOrder} 
                allProducts={allProducts} 
                allSellers={allSellers} 
            />
        </div>
    );
}

