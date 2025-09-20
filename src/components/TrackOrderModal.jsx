import React, { useState } from 'react';

// Komponen untuk modal lacak pesanan (versi lengkap)
export default function TrackOrderModal({ isOpen, onClose }) {
    // State untuk mengelola tipe pelacakan: 'transaction' atau 'receipt'
    const [trackType, setTrackType] = useState('transaction'); 
    const [trackId, setTrackId] = useState('');
    const [expedition, setExpedition] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleTrackOrder = (e) => {
        e.preventDefault();
        setError('');
        setOrderStatus(null);

        if (!trackId.trim()) {
            setError('Silakan masukkan nomor yang sesuai.');
            return;
        }
        // Validasi tambahan jika melacak dengan resi
        if (trackType === 'receipt' && !expedition) {
            setError('Silakan pilih ekspedisi.');
            return;
        }
        
        // Logika dummy untuk melacak pesanan
        setOrderStatus(`Status untuk ${trackType === 'transaction' ? 'transaksi' : 'resi'} #${trackId}: Sedang dalam pengiriman.`);
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-semibold">Lacak Pesanan</h3>
                    <button onClick={onClose} className="text-2xl font-light leading-none p-1">&times;</button>
                </div>
                <div className="p-6">
                    {/* Tombol untuk memilih tipe pelacakan */}
                    <div className="flex border border-slate-200 rounded-lg p-1 bg-slate-100 mb-4">
                        <button onClick={() => setTrackType('transaction')} className={`w-1/2 px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${trackType === 'transaction' ? 'bg-white shadow' : ''}`}>No. Transaksi</button>
                        <button onClick={() => setTrackType('receipt')} className={`w-1/2 px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${trackType === 'receipt' ? 'bg-white shadow' : ''}`}>No. Resi</button>
                    </div>
                    <form onSubmit={handleTrackOrder}>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder={trackType === 'transaction' ? 'Contoh: INV-12345678' : 'Masukkan nomor resi'}
                                className="w-full p-2.5 border rounded-md" 
                                value={trackId}
                                onChange={(e) => setTrackId(e.target.value)}
                                required 
                            />
                            {/* Input ekspedisi hanya muncul jika melacak dengan resi */}
                            {trackType === 'receipt' && (
                                <select value={expedition} onChange={(e) => setExpedition(e.target.value)} className="w-full p-2.5 border rounded-md bg-white" required>
                                    <option value="">Pilih Ekspedisi</option>
				    <option value="papaket">Papaket</option>
                                    <option value="jne">JNE Express</option>
                                    <option value="jnt">J&T Express</option>
                                    <option value="sicepat">SiCepat Ekspres</option>
                                    <option value="anteraja">Anteraja</option>
                                    <option value="ninja">Ninja Xpress</option>
				    <option value="SPX">SPX</option>
				    <option value="indah">Indah cargo</option>
				    <option value="jntcargo">J&T Cargo</option>
				    <option value="pos">Pos Ind</option>	
				    <option value="sipmen">SIPMEN</option>

                                </select>
                            )}
                        </div>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        {orderStatus && <p className="text-green-600 bg-green-50 p-3 rounded-md text-sm mt-4">{orderStatus}</p>}
                        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-teal-700">Lacak</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
