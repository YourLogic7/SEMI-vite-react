import React, { useState } from 'react';
import api from '../api';

// Komponen untuk modal pendaftaran pengguna baru
export default function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegister}) {
    if (!isOpen) return null;
    
    // state untuk menampilkan error
    const [error, setError] = useState("");

    
// ini untuk set form ke database Mongo

    const [formData, setFormData] = useState({
        name: '',
        noHandphone: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

// ini untuk data yang di kirim oleh axios:

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            setError("Password harus minimal 6 karakter.");
            return;
        }
        try {
            const response = await api.post('/api/users/register', formData);
            console.log('Pendaftaran berhasil:', response.data);
            alert('Pendaftaran berhasil!');
            onRegister(formData.name, formData.noHandphone, formData.email, formData.password);
            onClose();
        } catch (error) {
            console.error('Ada kesalahan saat mendaftar:', error);
            setError(error.response?.data?.error || error.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Daftar Akun Baru</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>

        
                <div className="p-6">
                    <form onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <input name="name" type="text"  placeholder="Nama Lengkap" className="w-full p-2.5 border rounded-md" value={formData.name} onChange={handleChange}  required />
                            <input name="noHandphone" type="text"  placeholder="Nomor Handphone" className="w-full p-2.5 border rounded-md" value={formData.noHandphone} onChange={handleChange}  required />
                            <input name="email" type="email" placeholder="Email" className="w-full p-2.5 border rounded-md" value={formData.email} onChange={handleChange}  required />
                            <input name="password" type="password" placeholder="Password (min. 6 karakter)" className="w-full p-2.5 border rounded-md" value={formData.password} onChange={handleChange}  required />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-6 cursor-pointer hover:bg-teal-700 transition-colors">Daftar</button>
                    </form>
                </div>
                <div className="p-5 border-t bg-slate-50 text-center">
                    <p className="text-sm">Sudah punya akun? <button type="button" onClick={onSwitchToLogin} className="font-semibold text-teal-600">Masuk</button></p>
                </div>
            </div>
        </div>
    );
}

