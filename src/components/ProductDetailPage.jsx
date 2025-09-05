import React, { useState } from 'react';
import StarRating from './StarRating';
import { ShoppingCart, ShoppingBag, Heart } from 'lucide-react';

// Komponen untuk Form Ulasan
function ReviewForm({ productId, onAddReview, user, openMessageModal }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            openMessageModal("Peringatan", "Mohon berikan rating bintang.");
            return;
        }
        // Menggunakan nama pengguna yang sedang login untuk ulasan
        onAddReview(productId, { rating, comment, user: user.name });
        setRating(0);
        setComment("");
    };

    return (
        <div className="border-t mt-6 pt-6">
            <h3 className="text-lg font-semibold mb-2">Tulis Ulasan Anda</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-slate-700">Rating Anda</label>
                    <StarRating rating={rating} setRating={setRating} interactive={true} />
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-slate-700">Komentar</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        placeholder="Bagikan pengalaman Anda tentang produk ini..."
                        required
                    ></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">Kirim Ulasan</button>
            </form>
        </div>
    );
}

// Komponen Utama Halaman Detail Produk
export default function ProductDetailPage({ product, user, onNavigate, sellers, addToCart, handleBuyNow, onAddReview, wishlist, onToggleWishlist, openMessageModal }) {
    const [quantity, setQuantity] = useState(1);
    
    const seller = sellers.find(s => s.id === product.sellerId);
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);
    const isInWishlist = wishlist.includes(product.id);

    const totalReviews = product.reviews?.length || 0;
    const averageRating = totalReviews > 0 ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
    
    const handleWishlistClick = (e) => {
        e.preventDefault();
        onToggleWishlist(product.id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={() => onNavigate({ page: 'home' })} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 mb-6">
                &larr; Kembali
            </button>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg object-cover aspect-square"/>
                        <button 
                            onClick={handleWishlistClick}
                            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-slate-600 hover:text-red-500 hover:scale-110 transition-all"
                            aria-label="Tambah ke Wishlist"
                        >
                            <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={1.5} />
                        </button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                            <span>Terjual {product.sold}+</span>
                            <span className="flex items-center gap-1">
                                <StarRating rating={averageRating} />
                                <span className="font-semibold">{averageRating.toFixed(1)}</span>
                                <span>({totalReviews} ulasan)</span>
                            </span>
                        </div>
                        <p className="text-4xl font-extrabold text-teal-600 mb-6">{formattedPrice}</p>
                        <div className="border-t pt-4 mt-4">
                            <h3 className="font-semibold mb-2">Deskripsi Produk</h3>
                            <p className="text-slate-600 leading-relaxed">{product.description}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <p>Jumlah:</p>
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 font-bold">-</button>
                                <span className="px-4">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 font-bold">+</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                             <button onClick={() => addToCart(product, quantity)} className="w-full py-3 bg-teal-50 border-2 border-teal-600 text-teal-600 font-bold rounded-lg hover:bg-teal-100 flex items-center justify-center gap-2">
                                <ShoppingCart size={20} />
                                <span>Tambah Keranjang</span>
                             </button>
                             <button onClick={() => handleBuyNow(product)} className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2">
                                <ShoppingBag size={20} />
                                <span>Beli Sekarang</span>
                             </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian Ulasan */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                <h2 className="text-2xl font-bold mb-4">Ulasan Produk</h2>
                {totalReviews > 0 ? (
                    <div className="space-y-4">
                        {product.reviews.map(review => (
                            <div key={review.id} className="border-t pt-4">
                                <div className="flex items-center mb-1">
                                    <p className="font-semibold">{review.user}</p>
                                    <div className="ml-4"><StarRating rating={review.rating} /></div>
                                </div>
                                <p className="text-slate-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500">Belum ada ulasan untuk produk ini.</p>
                )}
                {/* Tampilkan form hanya jika user sudah login */}
                {user && <ReviewForm productId={product.id} onAddReview={onAddReview} user={user} openMessageModal={openMessageModal} />}
            </div>
        </div>
    );
}

