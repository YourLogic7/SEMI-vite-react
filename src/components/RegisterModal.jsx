import React, { useState } from 'react';
// import axios from 'axios';

// Komponen untuk modal pendaftaran pengguna baru
export default function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegister }) {
    const [error, setError] = useState("");
    
    if (!isOpen) return null;
// // ini untuk set form ke database Mongo

//     const [formData, setFormData] = useState({
//         nama: '',
//         noHandphone: '',
//         email: '',
//         password: '',
//     });

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//         });
//     };

// // ini untuk data yang di kirim oleh axios:

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//         const response = await axios.post('http://localhost:5000/api/users/register', formData);
//         console.log('Pendaftaran berhasil:', response.data);
//         alert('Pendaftaran berhasil!');
//         } catch (error) {
//         console.error('Ada kesalahan saat mendaftar:', error);
//         alert('Gagal mendaftar. Silakan coba lagi.');
//         }

//         const { nama, noHandphone, email, password } = e.target.elements;
//         // Simulasi logika pendaftaran
//         if (password.value.length < 6) {
//             setError("Password harus minimal 6 karakter.");
//             return;
//         };
//     };


    // jika yang diatas aktif, ini delete aja
    const handleRegister = (e) => {
        e.preventDefault();
        const { nama, noHandphone, email, password } = e.target.elements;
        // Simulasi logika pendaftaran
        if (password.value.length < 6) {
            setError("Password harus minimal 6 karakter.");
            return;
        }
        
        onRegister(nama.value, noHandphone.value, email.value, password.value);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Daftar Akun Baru</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>

                {/* nanti tambahin ini di masing2 object: value={formData.username} onChange={handleChange} */}
                <div className="p-6">
                    <form onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <input name="nama" type="text"  placeholder="Nama Lengkap" className="w-full p-2.5 border rounded-md" required />
                            <input name="wa" type="tel" placeholder="No. Whatsapp" className="w-full p-2.5 border rounded-md" required />
                            <input name="email" type="email" placeholder="Email" className="w-full p-2.5 border rounded-md" required />
                            <input name="password" type="password" placeholder="Password (min. 6 karakter)" className="w-full p-2.5 border rounded-md" required />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-6">Daftar</button>
                    </form>
                </div>
                <div className="p-5 border-t bg-slate-50 text-center">
                    <p className="text-sm">Sudah punya akun? <button type="button" onClick={onSwitchToLogin} className="font-semibold text-teal-600">Masuk</button></p>
                </div>
            </div>
        </div>
    );
}

