// Di aplikasi nyata, data ini akan datang dari database.

// database MongoDB

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://mrizkynash:kha1zuran@cluster0.tzri6fs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



// Ini adalah data "mock" atau tiruan untuk pengembangan.

export const initialUsers = [
    { id: 1, name: "Budi Santoso", email: "budi.s@example.com", role: "customer" },
    { id: 2, name: "Citra Lestari", email: "citra.l@example.com", role: "customer" },
    { id: 3, name: "Griya Batik Jogja", email: "store.batik@example.com", role: "seller" },
    { id: 4, name: "Rendang Asli Padang", email: "store.rendang@example.com", role: "seller" },
    { id: 5, name: "Dewi Anggraini", email: "dewi.a@example.com", role: "reseller" },
];

export const initialSellers = [
    { id: 1, name: "Griya Batik Jogja", province: "DI Yogyakarta", city: "Kota Yogyakarta", district: "Gondokusuman", bannerUrl: "https://placehold.co/1200x300/4f46e5/ffffff?text=Griya+Batik+Jogja" },
    { id: 2, name: "Rendang Asli Padang", province: "Sumatera Barat", city: "Kota Padang", district: "Padang Timur", bannerUrl: "https://placehold.co/1200x300/b91c1c/ffffff?text=Rendang+Asli+Padang" },
    { id: 3, name: "Mutiara Lombok", province: "Nusa Tenggara Barat", city: "Kota Mataram", district: "Sekarbela", bannerUrl: "https://placehold.co/1200x300/f59e0b/ffffff?text=Mutiara+Lombok" },
    { id: 4, name: "Gadget Cepat JKT", province: "DKI Jakarta", city: "Jakarta Pusat", district: "Gambir", bannerUrl: "https://placehold.co/1200x300/1d4ed8/ffffff?text=Gadget+Cepat+JKT" },
    { id: 5, name: "Herbal Borneo", province: "Kalimantan Barat", city: "Kota Pontianak", district: "Pontianak Selatan", bannerUrl: "https://placehold.co/1200x300/16a34a/ffffff?text=Herbal+Borneo" },
    { id: 6, name: "Seni Ukir Jepara", province: "Jawa Tengah", city: "Kab. Jepara", district: "Jepara", bannerUrl: "https://placehold.co/1200x300/92400e/ffffff?text=Seni+Ukir+Jepara" },
    { id: 7, name: "Pempek Palembang Asli", province: "Sumatera Selatan", city: "Kota Palembang", district: "Ilir Timur I", bannerUrl: "https://placehold.co/1200x300/facc15/000000?text=Pempek+Asli" },
    { id: 8, name: "Kain Tenun Sumba", province: "Nusa Tenggara Timur", city: "Kab. Sumba Timur", district: "Waingapu", bannerUrl: "https://placehold.co/1200x300/a16207/ffffff?text=Kain+Tenun+Sumba" },
    { id: 9, name: "Bumbu Dapur Ambon", province: "Maluku", city: "Kota Ambon", district: "Sirimau", bannerUrl: "https://placehold.co/1200x300/ef4444/ffffff?text=Bumbu+Ambon" },
    { id: 10, name: "Kopi Toraja Celebes", province: "Sulawesi Selatan", city: "Kota Makassar", district: "Ujung Pandang", bannerUrl: "https://placehold.co/1200x300/78350f/ffffff?text=Kopi+Toraja" },
    { id: 11, name: "Aksesoris Otomotif SBY", province: "Jawa Timur", city: "Kota Surabaya", district: "Gubeng", bannerUrl: "https://placehold.co/1200x300/374151/ffffff?text=Otomotif+SBY" },
    { id: 12, name: "Perlengkapan Bayi BDG", province: "Jawa Barat", city: "Kota Bandung", district: "Sukajadi", bannerUrl: "https://placehold.co/1200x300/fb7185/ffffff?text=Perlengkapan+Bayi" },
    { id: 13, name: "Peralatan Gunung Eiger", province: "Jawa Barat", city: "Kota Bandung", district: "Cimahi", bannerUrl: "https://placehold.co/1200x300/22c55e/ffffff?text=Peralatan+Gunung" },
    { id: 14, name: "Buku Gramedia", province: "DKI Jakarta", city: "Jakarta Barat", district: "Palmerah", bannerUrl: "https://placehold.co/1200x300/0ea5e9/ffffff?text=Toko+Buku" },
    { id: 15, name: "Skincare Korea Ori", province: "Banten", city: "Kota Tangerang", district: "Karawaci", bannerUrl: "https://placehold.co/1200x300/f472b6/ffffff?text=Skincare+Korea" },
];

const generateProducts = () => {
    const products = [];
    const categories = ["Makanan & Minuman", "Fashion Pria", "Fashion Wanita", "Elektronik", "Kesehatan & Kecantikan", "Rumah Tangga", "Hobi & Koleksi", "Otomotif", "Ibu & Bayi", "Olahraga", "Buku & Alat Tulis"];
    const productNames = {
        "Makanan & Minuman": ["Keripik", "Kopi Bubuk", "Teh Herbal", "Sambal Botol", "Madu Hutan", "Bumbu Instan"],
        "Fashion Pria": ["Kemeja Lengan Panjang", "Kaos Polos", "Celana Chino", "Jaket Bomber", "Sepatu Sneakers", "Dompet Kulit"],
        "Fashion Wanita": ["Blouse Muslimah", "Gamis Modern", "Rok Plisket", "Tas Selempang", "Pashmina Ceruti", "High Heels"],
        "Elektronik": ["TWS Bluetooth", "Power Bank", "Mouse Wireless", "Keyboard Mechanical", "Smartwatch", "Charger GaN"],
        "Kesehatan & Kecantikan": ["Serum Wajah", "Sunscreen SPF 50", "Masker Organik", "Vitamin C", "Shampoo Anti-Rontok", "Body Lotion"],
        "Rumah Tangga": ["Spatula Silikon", "Panci Anti Lengket", "Lampu LED Emergency", "Rak Dinding", "Sprei Katun", "Pengharum Ruangan"],
        "Hobi & Koleksi": ["Action Figure", "Diecast Mobil", "Buku Komik", "Tanaman Hias", "Benang Rajut", "Sticker Pack"],
        "Otomotif": ["Lampu LED Motor", "Sarung Jok Mobil", "Parfum Mobil", "Kanebo Super", "Kunci Roda", "Oli Mesin"],
        "Ibu & Bayi": ["Diapers Sekali Pakai", "Botol Susu", "Baju Bayi Set", "Gendongan Bayi", "Mainan Edukasi Anak", "Minyak Telon"],
        "Olahraga": ["Jersey Bola", "Matras Yoga", "Tali Skipping", "Botol Minum", "Sarung Tangan Gym", "Kacamata Renang"],
        "Buku & Alat Tulis": ["Novel Fiksi", "Buku Self-Improvement", "Pulpen Gel", "Buku Tulis A5", "Sticky Notes", "Crayon Set"],
    };

    for (let i = 1; i <= 200; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const nameTemplate = productNames[category][Math.floor(Math.random() * productNames[category].length)];
        const seller = initialSellers[Math.floor(Math.random() * initialSellers.length)];
        
        products.push({
            id: i,
            sellerId: seller.id,
            name: `${nameTemplate} #${i}`,
            price: Math.floor(Math.random() * (2000 - 10) + 10) * 1000,
            stock: Math.floor(Math.random() * 200) + 10,
            imageUrl: `https://placehold.co/400x400/A9A9A9/ffffff?text=Produk+${i}`,
            sold: Math.floor(Math.random() * 1500) + 5,
            description: `Deskripsi lengkap untuk ${nameTemplate} #${i}. Produk berkualitas dari ${seller.name} di ${seller.city}.`,
            category: category,
            reviews: [],
        });
    }
    return products;
};

export const initialProducts = generateProducts();

export const flashSaleProducts = [
    { id: 201, sellerId: 10, name: "Kopi Toraja Flash Sale", price: 75000, discountPrice: 49000, totalStock: 100, sold: 85, imageUrl: "https://placehold.co/400x400/78350f/ffffff?text=Kopi+Toraja", description: "Kopi Toraja edisi spesial flash sale.", category: "Minuman", reviews: [] },
    { id: 202, sellerId: 1, name: "Batik Tulis Diskon Kilat", price: 450000, discountPrice: 299000, totalStock: 20, sold: 18, imageUrl: "https://placehold.co/400x400/4f46e5/ffffff?text=Batik+Tulis", description: "Batik Tulis edisi spesial flash sale.", category: "Fashion", reviews: [] },
    { id: 203, sellerId: 9, name: "Sambal Roa Super Pedas", price: 35000, discountPrice: 19000, totalStock: 200, sold: 150, imageUrl: "https://placehold.co/400x400/b91c1c/ffffff?text=Sambal+Roa", description: "Sambal Roa edisi spesial flash sale.", category: "Makanan", reviews: [] },
    { id: 204, sellerId: 6, name: "Ukiran Jepara Terbatas", price: 320000, discountPrice: 250000, totalStock: 30, sold: 10, imageUrl: "https://placehold.co/400x400/92400e/ffffff?text=Ukiran+Jepara", description: "Ukiran Jepara edisi spesial flash sale.", category: "Rumah Tangga", reviews: [] },
    { id: 205, sellerId: 4, name: "TWS Gaming Murah", price: 180000, discountPrice: 99000, totalStock: 80, sold: 75, imageUrl: "https://placehold.co/400x400/581c87/ffffff?text=TWS+Gaming", description: "TWS Gaming edisi spesial flash sale.", category: "Elektronik", reviews: [] },
];

// --- PERBAIKAN DI SINI: Menambahkan lebih banyak data pesanan ---
export const initialOrders = [
    { id: 'ORD-001', sellerId: 1, customer: 'Budi S.', date: '2025-08-07', total: 165000, status: 'Selesai', items: [{ productId: 15, quantity: 1 }, { productId: 16, quantity: 1 }] },
    { id: 'ORD-002', sellerId: 2, customer: 'Citra L.', date: '2025-08-06', total: 450000, status: 'Selesai', items: [{ productId: 28, quantity: 1 }] },
    { id: 'ORD-003', sellerId: 4, customer: 'Dewi K.', date: '2025-08-08', total: 35000, status: 'Diproses', items: [{ productId: 1, quantity: 1 }] },
    { id: 'ORD-004', sellerId: 10, customer: 'Andi P.', date: '2025-08-09', total: 75000, status: 'Dikirim', items: [{ productId: 101, quantity: 1 }] },
    { id: 'ORD-005', sellerId: 7, customer: 'Rina M.', date: '2025-08-10', total: 120000, status: 'Diproses', items: [{ productId: 55, quantity: 2 }] },
    // Data dummy tambahan
    { id: 'ORD-006', sellerId: 1, customer: 'Agus W.', date: '2025-08-19', total: 250000, status: 'Diproses', items: [{ productId: 10, quantity: 2 }] },
    { id: 'ORD-007', sellerId: 3, customer: 'Sari P.', date: '2025-08-19', total: 125000, status: 'Diproses', items: [{ productId: 45, quantity: 1 }] },
    { id: 'ORD-008', sellerId: 1, customer: 'Eko J.', date: '2025-08-18', total: 88000, status: 'Dikirim', items: [{ productId: 22, quantity: 1 }] },
    { id: 'ORD-009', sellerId: 2, customer: 'Fitri A.', date: '2025-08-18', total: 320000, status: 'Selesai', items: [{ productId: 31, quantity: 1 }] },
    { id: 'ORD-010', sellerId: 3, customer: 'Bambang T.', date: '2025-08-19', total: 95000, status: 'Diproses', items: [{ productId: 60, quantity: 1 }] },
];
