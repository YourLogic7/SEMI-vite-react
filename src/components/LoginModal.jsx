import React, { useState } from 'react';
import api from '../api';


// Komponen untuk modal login
export default function LoginModal({ isOpen, onClose, onSwitchToRegister, onCredentialsSuccess, openMessageModal }) {
    if (!isOpen) return null;

// ini untuk database mongo
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    // ini untuk AXIOS

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/users/login', formData);
            console.log('Login berhasil:', response.data);
            onCredentialsSuccess(response.data.user); // Kirim seluruh objek user
            onClose();
        } catch (error) {
            console.error('Ada kesalahan saat login:', error);
            openMessageModal('Login gagal. Periksa email dan kata sandi Anda.');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Masuk</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                {/* nanti tambahin ini sesuai object value={formData.password} onChange={handleChange} */}

                <div className="p-6">
                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <input name="email" type="text" placeholder="Email" className="w-full p-2.5 border rounded-md" value={formData.email} onChange={handleChange} required />
                            <input name="password" type="password" placeholder="Password" className="w-full p-2.5 border rounded-md" value={formData.password} onChange={handleChange}  required />
                        </div>
                        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-6">Masuk</button>
                    </form>
                </div>
                <div className="p-5 border-t bg-slate-50 text-center">
                    <p className="text-sm">Belum punya akun? <button type="button" onClick={onSwitchToRegister} className="font-semibold text-teal-600">Daftar</button></p>
                </div>
            </div>
        </div>
    );
}

