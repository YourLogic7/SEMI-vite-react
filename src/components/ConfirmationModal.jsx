import React from 'react';

// Komponen modal konfirmasi yang bisa digunakan ulang
export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{message}</p>
                <div className="mt-6 flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Konfirmasi
                    </button>
                </div>
            </div>
        </div>
    );
}
