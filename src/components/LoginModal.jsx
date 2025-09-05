import React from 'react';

// Komponen untuk modal login
export default function LoginModal({ isOpen, onClose, onSwitchToRegister, onCredentialsSuccess, openMessageModal }) {
    if (!isOpen) return null;

    const handleLogin = (e) => { 
        e.preventDefault(); 
        const { email, password } = e.target.elements; 
        
        // Simulasi: Cek apakah user terdaftar (misal: password benar)
        if (password.value === 'sima123!') {
            onCredentialsSuccess(email.value, password.value);
        } else {
            openMessageModal("Login Gagal", "Username atau password salah.");
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Masuk</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <input name="email" type="text" placeholder="Username (coba: usersima)" className="w-full p-2.5 border rounded-md" required />
                            <input name="password" type="password" placeholder="Password (coba: sima123!)" className="w-full p-2.5 border rounded-md" required />
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

