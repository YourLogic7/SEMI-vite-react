import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Impor ProductCard untuk digunakan di Wishlist

// --- Sub-Komponen untuk setiap Tampilan ---

const ProfileView = ({ user, onUpdateUserProfile, openMessageModal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.displayName || 'Pengguna SEMI',
        email: user?.email,
        whatsapp: '081234567890',
        dob: '1990-01-01',
        gender: 'Pria',
    });

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        onUpdateUserProfile(profileData);
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Profil Saya</h3>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">
                        Ubah Profil
                    </button>
                )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-500">Nama</label>
                            {isEditing ? (
                                <input type="text" name="name" value={profileData.name} onChange={handleChange} className="w-full p-2 border rounded-md mt-1" />
                            ) : (
                                <p className="font-semibold">{profileData.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500">Email</label>
                             {isEditing ? (
                                <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full p-2 border rounded-md mt-1" />
                            ) : (
                                <p className="font-semibold">{profileData.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500">No. Whatsapp</label>
                             {isEditing ? (
                                <input type="tel" name="whatsapp" value={profileData.whatsapp} onChange={handleChange} className="w-full p-2 border rounded-md mt-1" />
                            ) : (
                                <p className="font-semibold">{profileData.whatsapp}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500">Tanggal Lahir</label>
                             {isEditing ? (
                                <input type="date" name="dob" value={profileData.dob} onChange={handleChange} className="w-full p-2 border rounded-md mt-1" />
                            ) : (
                                <p className="font-semibold">{profileData.dob}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500">Jenis Kelamin</label>
                             {isEditing ? (
                                <select name="gender" value={profileData.gender} onChange={handleChange} className="w-full p-2 border rounded-md mt-1 bg-white">
                                    <option>Pria</option>
                                    <option>Wanita</option>
                                </select>
                            ) : (
                                <p className="font-semibold">{profileData.gender}</p>
                            )}
                        </div>
                    </div>
                    {isEditing && (
                        <div className="text-right mt-6">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100 mr-2">Batal</button>
                            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">Simpan Perubahan</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

// Tampilan Pesanan Saya (dengan detail)
const OrdersView = ({ user, allOrders, allProducts, allSellers }) => {
    const userOrders = allOrders.filter(order => order.customer === (user?.name));

    const findProduct = (productId) => allProducts.find(p => p.id === productId);
    const findSeller = (sellerId) => allSellers.find(s => s.id === sellerId);

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Pesanan Saya</h3>
            <div className="space-y-4">
                {userOrders.length > 0 ? (
                    userOrders.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border">
                            <div className="flex justify-between items-center border-b pb-2 mb-3">
                                <div>
                                    <p className="font-bold text-teal-600">{order.id}</p>
                                    <p className="text-sm text-slate-500">{order.date}</p>
                                    <p className="text-xs text-slate-500">Dari: {findSeller(order.sellerId)?.name || 'N/A'}</p>
                                </div>
                                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                    order.status === 'Selesai' ? 'bg-green-100 text-green-800' : 
                                    order.status === 'Dikirim' ? 'bg-blue-100 text-blue-800' :
                                    'bg-orange-100 text-orange-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                            {order.items.map((item, index) => {
                                const product = findProduct(item.productId);
                                return (
                                    <div key={index} className="flex items-center gap-4">
                                        <img src={product?.imageUrl} alt={product?.name} className="w-16 h-16 rounded-md object-cover" />
                                        <p className="font-semibold">{product?.name}</p>
                                    </div>
                                );
                            })}
                            <div className="text-right mt-3 pt-2 border-t">
                                <p className="text-sm">Total Pesanan: <span className="font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total)}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500">Anda belum memiliki pesanan.</p>
                )}
            </div>
        </div>
    );
};

// Tampilan Wishlist (BARU)
const WishlistView = ({ wishlist, allProducts, onNavigate, onToggleWishlist }) => (
    <div>
        <h3 className="text-xl font-bold mb-4">Wishlist Saya</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProducts
                .filter(product => wishlist.includes(product.id))
                .map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        onNavigate={onNavigate}
                        wishlist={wishlist}
                        onToggleWishlist={onToggleWishlist}
                        // Fungsi dummy karena tidak relevan di halaman ini
                        addToCart={() => {}} 
                        handleBuyNow={() => {}}
                    />
                ))
            }
        </div>
        {wishlist.length === 0 && <p>Anda belum menambahkan produk ke wishlist.</p>}
    </div>
);

// Komponen Utama Halaman Profil Pengguna
export default function UserProfilePage({ user, wishlist, allProducts, onNavigate, onToggleWishlist, orders, onUpdateUserProfile, openMessageModal, allSellers }) {
    const [activeTab, setActiveTab] = useState('profil');

    const renderContent = () => {
        switch(activeTab) {
            case 'profil':
                return <ProfileView user={user} onUpdateUserProfile={onUpdateUserProfile} openMessageModal={openMessageModal} />;
            case 'pesanan':
                return <OrdersView user={user} allOrders={orders} allProducts={allProducts} allSellers={allSellers} />;
            case 'wishlist':
                return <WishlistView wishlist={wishlist} allProducts={allProducts} onNavigate={onNavigate} onToggleWishlist={onToggleWishlist} />;
            default:
                return <ProfileView user={user} onUpdateUserProfile={onUpdateUserProfile} openMessageModal={openMessageModal} />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Akun Saya</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <nav className="space-y-2">
                            <button onClick={() => setActiveTab('profil')} className={`w-full text-left p-2 rounded-lg ${activeTab === 'profil' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Profil Saya</button>
                            <button onClick={() => setActiveTab('pesanan')} className={`w-full text-left p-2 rounded-lg ${activeTab === 'pesanan' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Pesanan Saya</button>
                            <button onClick={() => setActiveTab('wishlist')} className={`w-full text-left p-2 rounded-lg ${activeTab === 'wishlist' ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-100'}`}>Wishlist</button>
                        </nav>
                    </div>
                </div>
                <div className="md:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
