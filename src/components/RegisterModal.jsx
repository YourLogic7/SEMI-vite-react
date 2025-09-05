import React, { useState } from 'react';

// Komponen untuk modal pendaftaran pengguna baru
export default function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegister }) {
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleRegister = (e) => {
        e.preventDefault();
        const { nama, wa, email, password } = e.target.elements;
        // Simulasi logika pendaftaran
        if (password.value.length < 6) {
            setError("Password harus minimal 6 karakter.");
            return;
        }
        
        onRegister(nama.value, email.value, password.value);
        onClose();
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
                            <input name="nama" type="text" placeholder="Nama Lengkap" className="w-full p-2.5 border rounded-md" required />
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

