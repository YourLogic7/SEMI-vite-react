import { useReducer, useEffect, useMemo  } from 'react'
import api from './api';

// Impor semua komponen yang dibutuhkan
import Header from './components/Header';
import MainContent from './components/MainContent';
import ProductDetailPage from './components/ProductDetailPage';
import StorePage from './components/StorePage';
import UserProfilePage from './components/UserProfilePage';
import SellerDashboard from './components/SellerDashboard';
import ResellerDashboard from './components/ResellerDashboard';
import AffiliateDashboard from './components/AffiliateDashboard';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import MulaiJualanModal from './components/MulaiJualanModal';
import StoreRegisterModal from './components/StoreRegisterModal';
import ResellerRegisterModal from './components/ResellerRegisterModal';
import AffiliateRegisterModal from './components/AffiliateRegisterModal';
import TrackOrderModal from './components/TrackOrderModal';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import PaymentModal from './components/PaymentModal';
import Footer from './components/Footer';
import LiveChatWidget from './components/LiveChatWidget';
import BantuanPage from './components/BantuanPage';
import BlogPage from './components/BlogPage';
import CaraBelanjaPage from './components/CaraBelanjaPage';
import TentangKamiPage from './components/TentangKamiPage';
import KarirPage from './components/KarirPage';
import PembayaranPage from './components/PembayaranPage';
import LacakPesananPage from './components/LacakPesananPage';
import MulaiBerjualanPage from './components/MulaiBerjualanPage';
import PusatEdukasiPage from './components/PusatEdukasiPage';
import TipsTrikPage from './components/TipsTrikPage';
import LoadingScreen from './components/LoadingScreen';
import LiveStreamPlayer from './components/LiveStreamPlayer';
import OtpModal from './components/OtpModal';
import CategoryPage from './components/CategoryPage';
import SuperAdminLogin from './components/SuperAdminLogin';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import MessageModal from './components/MessageModal';
import ConfirmationModal from './components/ConfirmationModal';
import './index.css';



// Reducer untuk mengelola seluruh state aplikasi
const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_INITIAL_DATA':
            return { ...state, ...action.payload, isLoading: false };
        case 'SET_USER':
            return { ...state, user: action.payload, isLoginModalOpen: false, isOtpModalOpen: false, isRegisterModalOpen: false, isSuperAdmin: action.payload?.role === 'superadmin' };
        case 'LOGOUT':
            return { ...state, user: null, isSuperAdmin: false, cart: [], currentView: { page: 'home', data: null } };
        case 'NAVIGATE':
            return { ...state, currentView: action.payload };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_FILTERS':
            return { ...state, filters: action.payload, visibleProductsCount: 12 };
        case 'RESET_FILTERS':
            return { ...state, filters: { minPrice: '', maxPrice: '', location: '', rating: 0, category: '', sortBy: 'terbaru' }, visibleProductsCount: 12 };
        case 'SET_VISIBLE_PRODUCTS_COUNT':
            return { ...state, visibleProductsCount: action.payload };
        case 'ADD_TO_CART': {
            const { product, quantity } = action.payload;
            const existingItem = state.cart.find(item => item.id === product.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                    ),
                };
            }
            return { ...state, cart: [...state.cart, { ...product, quantity }] };
        }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case 'OPEN_MODAL':
            return { ...state, [action.payload.name]: true };
        case 'CLOSE_MODAL':
            return { ...state, [action.payload.name]: false };
        case 'ADD_NOTIFICATION':
            return { ...state, notifications: [action.payload, ...state.notifications] };
        case 'MARK_NOTIF_AS_READ':
            return {
                ...state,
                notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n),
            };
        case 'SET_CHECKOUT_TOTAL':
            return { ...state, checkoutTotal: action.payload };
        case 'FINALIZE_ORDER': {
            const newOrder = {
                id: `ORD-${Date.now().toString().slice(-5)}`,
                sellerId: state.cart[0].sellerId,
                customer: state.user.name,
                date: new Date().toISOString().slice(0, 10),
                total: action.payload.total,
                status: 'Diproses',
                items: state.cart.map(item => ({ productId: item.id, quantity: item.quantity })),
                paymentMethod: action.payload.method,
            };
            return {
                ...state,
                orders: [newOrder, ...state.orders],
                cart: [],
                isPaymentModalOpen: false,
            };
        }
        case 'REGISTER_ROLE_SUCCESS': {
            const { role, data } = action.payload;
            const displayName = data.storeName || data.resellerName || data.affiliateName || state.user.name || "Pengguna Baru";
            const updatedUser = { ...state.user, role: role, name: displayName, displayName: displayName };
            
            let newSellers = [...state.sellers];
            if (role === 'seller' && state.user) {
                const newSeller = {
                    id: state.user.id,
                    name: data.storeName,
                    location: data.location,
                    bannerUrl: `https://placehold.co/1200x300/a16207/ffffff?text=${data.storeName.replace(/\s/g, '+')}`
                };
                newSellers = [...newSellers, newSeller];
            }
            
            const updatedUsers = state.users.map(u => u.id === state.user.id ? updatedUser : u);
            if (!updatedUsers.some(u => u.id === updatedUser.id)) {
                 updatedUsers.push(updatedUser);
            }

            return {
                ...state,
                user: updatedUser,
                users: updatedUsers,
                sellers: newSellers,
                isStoreRegisterModalOpen: false,
                isResellerRegisterModalOpen: false,
                isAffiliateRegisterModalOpen: false,
                currentView: { page: `${role}Dashboard`, data: null },
            };
        }
        case 'ADD_REVIEW': {
            const { productId, review } = action.payload;
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === productId ? { ...p, reviews: [...p.reviews, { ...review, id: Date.now() }] } : p
                ),
            };
        }
        case 'TOGGLE_WISHLIST': {
            const productId = action.payload;
            const isInWishlist = state.wishlist.includes(productId);
            const newWishlist = isInWishlist
                ? state.wishlist.filter(id => id !== productId)
                : [...state.wishlist, productId];
            return { ...state, wishlist: newWishlist };
        }
        case 'SET_MESSAGE_MODAL':
            return { ...state, messageModal: action.payload };
        case 'SET_CONFIRM_MODAL':
            return { ...state, confirmModal: action.payload };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(p => p.id === action.payload.id ? action.payload : p),
            };
        case 'ADD_PRODUCT':
            const newProduct = {
                ...action.payload,
                id: Date.now(),
                sellerId: state.user.id,
                sold: 0,
                reviews: [],
                imageUrl: `https://placehold.co/400x400/A9A9A9/ffffff?text=${action.payload.name.replace(/\s/g, '+')}`
            };
            return {
                ...state,
                products: [...state.products, newProduct],
            };
        case 'DELETE_PRODUCT':
            return { ...state, products: state.products.filter(p => p.id !== action.payload) };
        case 'UPDATE_ORDER_STATUS':
            const { orderId, newStatus, resi } = action.payload;
            return {
                ...state,
                orders: state.orders.map(o => o.id === orderId ? { ...o, status: newStatus, resi: resi || o.resi } : o),
            };
        case 'DELETE_USER':
            return { ...state, users: state.users.filter(u => u.id !== action.payload) };
        case 'SET_PENDING_EMAIL':
            return { ...state, pendingUserEmail: action.payload };
        case 'UPDATE_USER_PROFILE': {
            const updatedProfile = action.payload;
            const updatedUser = { ...state.user, ...updatedProfile };
            const updatedUsersList = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);
            return {
                ...state,
                user: updatedUser,
                users: updatedUsersList
            };
        }
        case 'ADD_USER': {
            const newUser = action.payload;
            if (!state.users.some(u => u.email === newUser.email)) {
                return { ...state, users: [...state.users, newUser] };
            }
            return state;
        }
        default:
            return state;
    }
};

const initialState = {
    isLoading: true,
    user: null,
    currentView: { page: 'home', data: null },
    cart: [],
    searchQuery: '',
    products: [],
    sellers: [],
    orders: [],
    users: [],
    flashSaleProducts: [],
    filters: { minPrice: '', maxPrice: '', location: '', rating: 0, category: '', sortBy: 'terbaru' },
    notifications: [],
    isSuperAdmin: false,
    visibleProductsCount: 12,
    checkoutTotal: 0,
    wishlist: [],
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isMulaiJualanModalOpen: false,
    isStoreRegisterModalOpen: false,
    isResellerRegisterModalOpen: false,
    isAffiliateRegisterModalOpen: false,
    isCartModalOpen: false,
    isTrackOrderModalOpen: false,
    isCheckoutModalOpen: false,
    isPaymentModalOpen: false,
    isOtpModalOpen: false,
    pendingUserEmail: null,
    messageModal: { isOpen: false, title: '', message: '' },
    confirmModal: { isOpen: false, title: '', message: '', onConfirm: () => {} },
};

export default function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);



    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [productsRes, sellersRes, ordersRes, usersRes] = await Promise.all([
                    api.get('/api/products'),
                    api.get('/api/sellers'),
                    api.get('/api/orders'),
                    api.get('/api/users'),
                ]);

                const flashSaleProducts = productsRes.data.filter(p => p.isFlashSale);
                const normalProducts = productsRes.data.filter(p => !p.isFlashSale);

                dispatch({
                    type: 'SET_INITIAL_DATA',
                    payload: {
                        products: normalProducts,
                        flashSaleProducts: flashSaleProducts,
                        sellers: sellersRes.data,
                        orders: ordersRes.data,
                        users: usersRes.data,
                    }
                });
            } catch (error) {
                console.error("Gagal mengambil data awal:", error);
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchInitialData();
    }, []);

    const {
        isLoading, user, currentView, cart, searchQuery, products, sellers, orders, users, filters,
        notifications, isSuperAdmin, visibleProductsCount, checkoutTotal, wishlist, flashSaleProducts,
        isLoginModalOpen, isRegisterModalOpen, isMulaiJualanModalOpen, isStoreRegisterModalOpen,
        isResellerRegisterModalOpen, isAffiliateRegisterModalOpen, isCartModalOpen, isTrackOrderModalOpen,
        isCheckoutModalOpen, isPaymentModalOpen, isOtpModalOpen, pendingUserEmail, messageModal, confirmModal
    } = state;

    useEffect(() => {
        const checkUrl = () => {
            if (window.location.pathname === '/superadmin' && !isSuperAdmin) {
                dispatch({ type: 'NAVIGATE', payload: { page: 'superAdminLogin', data: null } });
            }
        };
        checkUrl();
    }, [isSuperAdmin]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentView]);
    
    useEffect(() => {
        dispatch({ type: 'SET_VISIBLE_PRODUCTS_COUNT', payload: 12 });
    }, [filters, searchQuery]);

    const getSellerName = (sellerId) => sellers.find(s => s._id === sellerId)?.name || 'Penjual Tidak Dikenal';
    
    const getSellerLocation = (sellerId) => {
        const seller = sellers.find(s => s._id === sellerId);
        if (!seller) return 'Indonesia';
        return `${seller.province}, ${seller.district}`;
    };

    const processedProducts = useMemo(() => {
        let allProds = [...products, ...flashSaleProducts];
        return allProds.map(product => ({
            ...product,
            sellerName: getSellerName(product.sellerId),
            sellerLocation: getSellerLocation(product.sellerId)
        }));
    }, [products, flashSaleProducts, sellers]);

    const filteredProducts = useMemo(() => {
        let prods = processedProducts.filter(p => !p.isFlashSale);

        prods = prods.filter(product => {
            const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
            const minPriceMatch = filters.minPrice ? product.price >= parseFloat(filters.minPrice) : true;
            const maxPriceMatch = filters.maxPrice ? product.price <= parseFloat(filters.maxPrice) : true;
            const categoryMatch = filters.category ? product.category.toLowerCase().includes(filters.category.toLowerCase()) : true;
            return searchMatch && minPriceMatch && maxPriceMatch && categoryMatch;
        });

        switch (filters.sortBy) {
            case 'terlaris':
                prods.sort((a, b) => b.sold - a.sold);
                break;
            case 'termurah':
                prods.sort((a, b) => a.price - b.price);
                break;
            case 'termahal':
                prods.sort((a, b) => b.price - a.price);
                break;
            case 'terbaru':
            default:
                prods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }

        return prods;
    }, [processedProducts, searchQuery, filters]);

    const openMessageModal = (title, message) => {
        dispatch({ type: 'SET_MESSAGE_MODAL', payload: { isOpen: true, title, message } });
    };

    const closeMessageModal = () => {
        dispatch({ type: 'SET_MESSAGE_MODAL', payload: { isOpen: false, title: '', message: '' } });
    };
    
    const openConfirmModal = (title, message, onConfirm) => {
        dispatch({ type: 'SET_CONFIRM_MODAL', payload: { isOpen: true, title, message, onConfirm } });
    };
    
    const closeConfirmModal = () => {
        dispatch({ type: 'SET_CONFIRM_MODAL', payload: { isOpen: false, title: '', message: '', onConfirm: () => {} } });
    };

    const requireLogin = (action) => {
        if (!user) {
            dispatch({ type: 'OPEN_MODAL', payload: { name: 'isLoginModalOpen' } });
            return false;
        }
        action();
        return true;
    };

    const handleLoginSuccess = async (userCredentials) => {
        try {
            // Handle 'usersima' special case if still needed, but it won't get _id from DB
            if (userCredentials.email.toLowerCase() === 'usersima') {
                const simaUser = { _id: 'sima_id', name: 'Sima User', email: 'usersima', role: 'customer', displayName: 'Sima User' }; // Added _id
                dispatch({ type: 'SET_USER', payload: simaUser });
                dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now(), text: `Selamat datang kembali, Sima User!`, type: 'info', read: false } });
                return;
            }

            // Make API call to backend login endpoint
            const response = await api.post('/api/users/login', { email: userCredentials.email, password: userCredentials.password });
            const { user: loggedInUser } = response.data;

            dispatch({ type: 'SET_USER', payload: loggedInUser });
            dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now(), text: `Selamat datang kembali, ${loggedInUser.name}!`, type: 'info', read: false } });

        } catch (error) {
            console.error("Gagal login:", error.response ? error.response.data : error.message);
            openMessageModal(
                'Login Gagal',
                error.response?.data?.message || 'Terjadi kesalahan saat mencoba login. Silakan coba lagi.'
            );
        }
    };
    
    const handleCredentialsSuccess = (userCredentials) => {
        dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isLoginModalOpen' } });
        handleLoginSuccess(userCredentials); // Pass full userCredentials object
    };

    const handleOtpVerification = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isOtpModalOpen' } });
        handleLoginSuccess(pendingUserEmail);
    };
    
    const handleRegister = async (name, noHandphone, email, password) => {
        console.log('App.jsx handleRegister called with:', { name, noHandphone, email, password });
        try {
            const response = await api.post('/api/users/register', { name, email, password, noHandphone });
            console.log('App.jsx handleRegister API response:', response.data);
            const { user: newUser } = response.data;
            
            dispatch({ type: 'SET_USER', payload: newUser });
            dispatch({ type: 'ADD_USER', payload: newUser });
            dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now(), text: `Selamat bergabung, ${name}! Akun Anda berhasil dibuat.`, type: 'info', read: false } });
            
        } catch (error) {
            console.error("App.jsx handleRegister error:", error.response ? error.response.data : error.message);
            openMessageModal(
                'Pendaftaran Gagal', 
                error.response?.data?.message || 'Terjadi kesalahan saat mencoba mendaftar. Silakan coba lagi.'
            );
        }
    };

    const handleLogout = () => {
        const wasAdmin = isSuperAdmin;
        dispatch({ type: 'LOGOUT' });
        if (wasAdmin) {
            window.history.pushState({}, '', '/');
        }
    };

    const addToCart = (product, quantity = 1) => {
        if (!requireLogin(() => {})) return;
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
        openMessageModal('Berhasil', `${product.name} ditambahkan ke keranjang.`);
    };
    
    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const handleBuyNow = (product) => {
        if (!requireLogin(() => {})) return;
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity: 1 } });
        dispatch({ type: 'OPEN_MODAL', payload: { name: 'isCartModalOpen' } });
    };
    
    const handleAddReview = (productId, review) => {
        dispatch({ type: 'ADD_REVIEW', payload: { productId, review } });
        openMessageModal('Berhasil', 'Ulasan Anda berhasil ditambahkan!');
    };

    const handleCheckout = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isCartModalOpen' } });
        dispatch({ type: 'OPEN_MODAL', payload: { name: 'isCheckoutModalOpen' } });
    };
    
    const onProceedToPayment = (total) => {
        dispatch({ type: 'SET_CHECKOUT_TOTAL', payload: total });
        dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isCheckoutModalOpen' } });
        dispatch({ type: 'OPEN_MODAL', payload: { name: 'isPaymentModalOpen' } });
    };

    const onFinalizeOrder = (total, method) => {
        dispatch({ type: 'FINALIZE_ORDER', payload: { total, method } });
        openMessageModal('Pesanan Berhasil', 'Pesanan Anda telah berhasil dibuat! Terima kasih telah berbelanja.');
    };

    const handleOpenStoreClick = () => {
        if (!requireLogin(() => {})) return;
        if (user?.role && user?.role !== 'customer') {
            dispatch({ type: 'NAVIGATE', payload: { page: `${user?.role}Dashboard`, data: null } });
        } else {
            dispatch({ type: 'OPEN_MODAL', payload: { name: 'isMulaiJualanModalOpen' } });
        }
    };
    
    const handleSelectRole = (role) => {
        dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isMulaiJualanModalOpen' } });
        if (role === 'seller') dispatch({ type: 'OPEN_MODAL', payload: { name: 'isStoreRegisterModalOpen' } });
        else if (role === 'reseller') dispatch({ type: 'OPEN_MODAL', payload: { name: 'isResellerRegisterModalOpen' } });
        else if (role === 'affiliate') dispatch({ type: 'OPEN_MODAL', payload: { name: 'isAffiliateRegisterModalOpen' } });
    };
    
    const handleRoleRegistrationSuccess = async (role, data) => {
        try {
            if (role === 'seller') {
                if (!user || !user._id) {
                    openMessageModal('Pendaftaran Gagal', 'Anda harus login untuk mendaftarkan toko.');
                    return;
                }
                // Map data from StoreRegisterModal to sellerSchema
                const storeData = {
                    userId: user._id,
                    storeName: data.storeName,
                    province: data.province, // Assuming these are the IDs from the API
                    city: data.regency, // Map regency to city
                    district: data.district,
                    bannerUrl: `https://placehold.co/1200x300/a16207/ffffff?text=${data.storeName.replace(/\s/g, '+')}` // Placeholder
                };
                const response = await api.post('/api/sellers/register-store', storeData);
                console.log('Store registration successful:', response.data);
                dispatch({ type: 'REGISTER_ROLE_SUCCESS', payload: { role, data: response.data.seller } });
                openMessageModal('Pendaftaran Berhasil', 'Toko Anda berhasil didaftarkan!');
            } else {
                // For other roles, just update local state for now
                dispatch({ type: 'REGISTER_ROLE_SUCCESS', payload: { role, data } });
                dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now(), text: `Selamat! Anda sekarang adalah seorang ${role}.`, type: 'info', read: false } });
            }
        } catch (error) {
            console.error("Gagal mendaftarkan peran:", error.response?.data || error.message);
            openMessageModal('Pendaftaran Gagal', error.response?.data?.message || 'Terjadi kesalahan saat mendaftarkan peran. Silakan coba lagi.');
        }
    };
    
    const handleUpdateUserProfile = (updatedProfile) => {
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: updatedProfile });
        openMessageModal('Profil Diperbarui', 'Profil Anda berhasil diperbarui.');
    };

    const handleSellerSaveProduct = async (productData) => {
        try {
            if (!user || !user._id) {
                openMessageModal('Gagal Menyimpan Produk', 'Anda harus login untuk menambahkan/mengubah produk.');
                return;
            }

            // Assuming user.role is 'seller' and user._id is the userId
            // We need to find the sellerId from the sellers array using user._id
            const currentSeller = sellers.find(s => s.userId === user._id);
            if (!currentSeller) {
                openMessageModal('Gagal Menyimpan Produk', 'Anda belum memiliki toko yang terdaftar.');
                return;
            }

            const productPayload = {
                name: productData.name,
                price: parseFloat(productData.price),
                stock: parseInt(productData.stock),
                imageUrl: productData.imageUrl || `https://placehold.co/400x400/A9A9A9/ffffff?text=${productData.name.replace(/\s/g, '+')}`,
                description: productData.description,
                category: productData.category,
                sellerId: currentSeller._id, // Link to the actual seller _id
                // Add other fields from productData that are in productSchema if needed
                // isFlashSale: productData.isFlashSale,
                // discountPrice: productData.discountPrice,
                // totalStock: productData.totalStock,
            };

            if (productData._id) { // Check if it's an existing product (has _id from DB)
                const response = await api.put(`/api/products/${productData._id}`, productPayload);
                dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
                openMessageModal('Berhasil', 'Produk berhasil diperbarui.');
            } else {
                const response = await api.post('/api/products', productPayload);
                dispatch({ type: 'ADD_PRODUCT', payload: response.data });
                openMessageModal('Berhasil', 'Produk baru berhasil ditambahkan.');
            }
        } catch (error) {
            console.error("Gagal menyimpan produk:", error.response?.data || error.message);
            openMessageModal('Gagal Menyimpan Produk', error.response?.data?.message || 'Terjadi kesalahan saat menyimpan produk. Silakan coba lagi.');
        }
    };

    const handleSellerDeleteProduct = async (productId) => {
        try {
            await api.delete(`/api/products/${productId}`);
            dispatch({ type: 'DELETE_PRODUCT', payload: productId });
            openMessageModal('Berhasil', 'Produk berhasil dihapus.');
        } catch (error) {
            console.error("Gagal menghapus produk:", error.response?.data || error.message);
            openMessageModal('Gagal Menghapus Produk', error.response?.data?.message || 'Terjadi kesalahan saat menghapus produk. Silakan coba lagi.');
        }
    };

    const handleSellerUpdateOrder = (orderId, newStatus, resi) => {
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, newStatus, resi } });
    };

    const handleAdminLogin = (email, password) => {
        if (email === 'admin@semi.com' && password === 'admin123') {
            const adminUser = { id: 0, name: 'Super Admin', email, role: 'superadmin', displayName: 'Super Admin' };
            dispatch({ type: 'SET_USER', payload: adminUser });
            dispatch({ type: 'NAVIGATE', payload: { page: 'superAdminDashboard', data: null } });
        } else {
            openMessageModal('Login Gagal', 'Email atau Password Admin Salah!');
        }
    };
    
    const handleAdminDeleteUser = (userId) => {
        dispatch({ type: 'DELETE_USER', payload: userId });
        openMessageModal('Berhasil', 'Pengguna berhasil dihapus.');
    };

    const handleFilterChange = (updater) => {
        const newFilters = typeof updater === 'function' ? updater(filters) : updater;
        dispatch({ type: 'SET_FILTERS', payload: newFilters });
    };

    const mainContentProps = {
        products: filteredProducts.slice(0, visibleProductsCount),
        allProducts: filteredProducts,
        flashSaleProducts: processedProducts.filter(p => p.isFlashSale),
        sellers,
        onNavigate: (page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } }),
        searchQuery,
        filters,
        onFilterChange: handleFilterChange,
        onResetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
        addToCart,
        handleBuyNow,
        onOpenStoreClick: handleOpenStoreClick,
        visibleProductsCount,
        setVisibleProductsCount: (count) => dispatch({ type: 'SET_VISIBLE_PRODUCTS_COUNT', payload: count }),
        wishlist,
        onToggleWishlist: (productId) => {
            if (!user) {
                openMessageModal('Login Dibutuhkan', 'Anda harus masuk untuk menambahkan produk ke wishlist.');
                return;
            }
            dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
            openMessageModal('Wishlist', `Produk berhasil ${wishlist.includes(productId) ? 'dihapus dari' : 'ditambahkan ke'} Wishlist.`);
        },
    };
    
    const renderPage = () => {
        switch (currentView.page) {
            case 'superAdminLogin': return <SuperAdminLogin onAdminLogin={handleAdminLogin} />;
            case 'superAdminDashboard': return <SuperAdminDashboard 
                allUsers={users} 
                allProducts={products} 
                allSellers={sellers} 
                allOrders={orders}
                onBroadcastNotification={(msg) => openMessageModal('Broadcast', `Notifikasi broadcast: ${msg}`)}
                onSaveProduct={handleSellerSaveProduct}
                onDeleteProduct={(id) => openConfirmModal('Hapus Produk', 'Apakah Anda yakin ingin menghapus produk ini?', () => handleSellerDeleteProduct(id))}
                onUpdateOrderStatus={handleSellerUpdateOrder}
                onDeleteUser={(id) => openConfirmModal('Hapus Pengguna', 'Apakah Anda yakin ingin menghapus pengguna ini?', () => handleAdminDeleteUser(id))}
                openMessageModal={openMessageModal}
                openConfirmModal={openConfirmModal}
            />;
            case 'productDetail': return <ProductDetailPage 
                product={currentView.data} 
                onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })}
                addToCart={addToCart}
                handleBuyNow={handleBuyNow}
                onAddReview={handleAddReview}
                user={user}
                sellers={sellers}
                openMessageModal={openMessageModal}
                wishlist={wishlist}
                onToggleWishlist={(id) => {
                    if (!user) {
                        openMessageModal('Login Dibutuhkan', 'Anda harus masuk untuk menambahkan produk ke wishlist.');
                        return;
                    }
                    dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
                    openMessageModal('Wishlist', `Produk berhasil ${wishlist.includes(id) ? 'dihapus dari' : 'ditambahkan ke'} Wishlist.`);
                }}
            />;
            case 'storePage': return <StorePage seller={currentView.data} products={products.filter(p => p.sellerId === currentView.data._id)} onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} sellers={sellers} addToCart={addToCart} handleBuyNow={handleBuyNow} />;
            case 'userProfile': return <UserProfilePage 
                user={user} 
                onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} 
                wishlist={wishlist} 
                allProducts={products} 
                onToggleWishlist={(id) => {
                    if (!user) {
                        openMessageModal('Login Dibutuhkan', 'Anda harus masuk untuk menambahkan produk ke wishlist.');
                        return;
                    }
                    dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
                    openMessageModal('Wishlist', `Produk berhasil ${wishlist.includes(id) ? 'dihapus dari' : 'ditambahkan ke'} Wishlist.`);
                }} 
                orders={orders}
                onUpdateUserProfile={handleUpdateUserProfile}
                openMessageModal={openMessageModal}
                allSellers={sellers}
            />;
            case 'sellerDashboard': 
                if (!user) return <LoadingScreen />;
                return <SellerDashboard 
                    user={user} 
                    products={products.filter(p => p.sellerId === user._id)} 
                    orders={orders.filter(o => o.sellerId === user._id)}
                    onSaveProduct={handleSellerSaveProduct}
                    onDeleteProduct={(id) => openConfirmModal('Hapus Produk', 'Apakah Anda yakin ingin menghapus produk ini?', () => handleSellerDeleteProduct(id))}
                    onUpdateOrder={handleSellerUpdateOrder}
                    openMessageModal={openMessageModal}
                    sellers={sellers}
                />;
            case 'resellerDashboard': return <ResellerDashboard user={user} openMessageModal={openMessageModal} />;
            case 'affiliateDashboard': return <AffiliateDashboard user={user} openMessageModal={openMessageModal} />;
            case 'bantuan': return <BantuanPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'blog': return <BlogPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'cara-belanja': return <CaraBelanjaPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'tentang-kami': return <TentangKamiPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'karir': return <KarirPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'pembayaran': return <PembayaranPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'lacak-pesanan': return <LacakPesananPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'mulai-berjualan': return <MulaiBerjualanPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'pusat-edukasi': return <PusatEdukasiPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'tips-trik': return <TipsTrikPage onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'liveStream': return <LiveStreamPlayer onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />;
            case 'categoryPage': return <CategoryPage 
                categoryName={currentView.data.categoryName} 
                allProducts={processedProducts} 
                sellers={sellers} 
                onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} 
                addToCart={addToCart} 
                handleBuyNow={handleBuyNow} 
                wishlist={wishlist} 
                onToggleWishlist={(id) => {
                    if (!user) {
                        openMessageModal('Login Dibutuhkan', 'Anda harus masuk untuk menambahkan produk ke wishlist.');
                        return;
                    }
                    dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
                    openMessageModal('Wishlist', `Produk berhasil ${wishlist.includes(id) ? 'dihapus dari' : 'ditambahkan ke'} Wishlist.`);
                }}
            />;
            default: return <MainContent {...mainContentProps} />;
        }
    };
    
    if (isLoading) return <LoadingScreen />;
    
    if (currentView.page === 'superAdminLogin') {
        return renderPage();
    }
    
    return (
        <div className="bg-slate-50 text-slate-800 flex flex-col min-h-screen">
            <Header 
                user={user} 
                onLoginClick={() => dispatch({ type: 'OPEN_MODAL', payload: { name: 'isLoginModalOpen' } })}
                onRegisterClick={() => dispatch({ type: 'OPEN_MODAL', payload: { name: 'isRegisterModalOpen' } })}
                onLogoutClick={handleLogout}
                onCartClick={() => requireLogin(() => dispatch({ type: 'OPEN_MODAL', payload: { name: 'isCartModalOpen' } }))}
                onTrackOrderClick={() => dispatch({ type: 'OPEN_MODAL', payload: { name: 'isTrackOrderModalOpen' } })}
                cartItemCount={cart.length}
                onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })}
                searchQuery={searchQuery}
                onSearch={(query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query })}
                onOpenStoreClick={handleOpenStoreClick}
                notifications={notifications}
                setNotifications={(newNotifs) => dispatch({ type: 'SET_NOTIFICATIONS', payload: newNotifs })}
                isSuperAdmin={isSuperAdmin}
            />
            <main className="flex-grow">
                {renderPage()}
            </main>
            
            {!isSuperAdmin && (
                <>
                    <Footer onNavigate={(page, data) => dispatch({ type: 'NAVIGATE', payload: { page, data } })} />
                    <LiveChatWidget />
                </>
            )}

            {/* --- Semua Modal --- */}
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isLoginModalOpen' } })} 
                onCredentialsSuccess={handleCredentialsSuccess} 
                onSwitchToRegister={() => { 
                    dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isLoginModalOpen' } });
                    dispatch({ type: 'OPEN_MODAL', payload: { name: 'isRegisterModalOpen' } });
                }} 
                openMessageModal={openMessageModal}
            />
             <OtpModal 
                isOpen={isOtpModalOpen}
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isOtpModalOpen' } })}
                onVerify={handleOtpVerification}
                openMessageModal={openMessageModal}
            />
            <RegisterModal 
                isOpen={isRegisterModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isRegisterModalOpen' } })} 
                onRegister={handleRegister} 
                onSwitchToLogin={() => { 
                    dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isRegisterModalOpen' } });
                    dispatch({ type: 'OPEN_MODAL', payload: { name: 'isLoginModalOpen' } });
                }} 
                openMessageModal={openMessageModal}
            />
            <MulaiJualanModal isOpen={isMulaiJualanModalOpen} onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isMulaiJualanModalOpen' } })} onSelectRole={handleSelectRole} />
            <StoreRegisterModal 
                isOpen={isStoreRegisterModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isStoreRegisterModalOpen' } })} 
                onRegistrationSuccess={(data) => handleRoleRegistrationSuccess('seller', data)}
                openMessageModal={openMessageModal}
            />
            <ResellerRegisterModal 
                isOpen={isResellerRegisterModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isResellerRegisterModalOpen' } })} 
                onRegistrationSuccess={(data) => handleRoleRegistrationSuccess('reseller', data)} 
                openMessageModal={openMessageModal}
            />
            <AffiliateRegisterModal 
                isOpen={isAffiliateRegisterModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isAffiliateRegisterModalOpen' } })} 
                onRegistrationSuccess={(data) => handleRoleRegistrationSuccess('affiliate', data)}
                openMessageModal={openMessageModal}
            />
            <TrackOrderModal 
                isOpen={isTrackOrderModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isTrackOrderModalOpen' } })} 
                orders={orders.filter(o => o.customer === (user && user.name))} 
                openMessageModal={openMessageModal}
            />
            <CartModal 
                isOpen={isCartModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isCartModalOpen' } })} 
                cartItems={cart} 
                onRemoveItem={removeFromCart} 
                onCheckout={handleCheckout} 
            />
            <CheckoutModal 
                isOpen={isCheckoutModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isCheckoutModalOpen' } })} 
                cartItems={cart} 
                user={user} 
                onProceedToPayment={onProceedToPayment} 
            />
            <PaymentModal 
                isOpen={isPaymentModalOpen} 
                onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: { name: 'isPaymentModalOpen' } })} 
                totalAmount={checkoutTotal} 
                onFinalizeOrder={onFinalizeOrder} 
                openMessageModal={openMessageModal}
                cartItems={cart}
                user={user}
            />
            <MessageModal
                isOpen={messageModal.isOpen}
                onClose={closeMessageModal}
                title={messageModal.title}
                message={messageModal.message}
            />
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={closeConfirmModal}
                onConfirm={() => {
                    confirmModal.onConfirm();
                    closeConfirmModal();
                }}
                title={confirmModal.title}
                message={confirmModal.message}
            />
        </div>
    );
}
