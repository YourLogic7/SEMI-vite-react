import React, { useState } from 'react';

// Komponen untuk modal OTP
export default function OtpModal({ isOpen, onClose, onVerify, openMessageModal }) {
    const [step, setStep] = useState('chooseMethod'); // 'chooseMethod' atau 'enterCode'
    const [otp, setOtp] = useState('');

    if (!isOpen) return null;

    const handleMethodSelect = (method) => {
        openMessageModal('Kode Terkirim', `Kode OTP telah dikirim melalui ${method}. (Simulasi)`);
        setStep('enterCode');
    };

    const handleVerify = (e) => {
        e.preventDefault();
        // Di aplikasi nyata, OTP akan dikirim ke server untuk verifikasi
        if (otp === '123456') { // Simulasi OTP yang benar
            onVerify(otp);
        } else {
            openMessageModal('Verifikasi Gagal', 'Kode OTP salah.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Verifikasi Akun</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>

                {step === 'chooseMethod' && (
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-slate-600 text-center">Pilih metode untuk menerima kode verifikasi (OTP):</p>
                        <button onClick={() => handleMethodSelect('SMS')} className="w-full p-3 border rounded-lg hover:bg-teal-50">Kirim via SMS</button>
                        <button onClick={() => handleMethodSelect('WhatsApp')} className="w-full p-3 border rounded-lg hover:bg-teal-50">Kirim via WhatsApp</button>
                        <button onClick={() => handleMethodSelect('Email')} className="w-full p-3 border rounded-lg hover:bg-teal-50">Kirim via Email</button>
                    </div>
                )}

                {step === 'enterCode' && (
                    <div className="p-6">
                        <p className="text-sm text-slate-600 text-center mb-4">Masukkan 6 digit kode OTP yang telah kami kirim.</p>
                        <form onSubmit={handleVerify}>
                            <input 
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                placeholder="------"
                                className="w-full p-3 text-center text-2xl tracking-[1em] border rounded-md"
                                required
                            />
                            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-teal-700">Verifikasi</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
