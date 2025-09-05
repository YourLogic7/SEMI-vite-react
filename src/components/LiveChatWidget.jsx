import React from 'react';

// Komponen untuk widget floating WhatsApp dengan SVG yang sudah diperbaiki
export default function LiveChatWidget() {
    // Ganti NOMOR_WHATSAPP dengan nomor tujuan Anda (gunakan format 628xxxx)
    const whatsAppNumber = '6281234567890';
    const prefilledMessage = encodeURIComponent('Halo Semi Marketplace, saya mau bertanya...');
    const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${prefilledMessage}`;

    return (
        <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
        >
            {/* --- PERBAIKAN DI SINI: SVG Ikon WhatsApp (Lengkap dan sudah diperbaiki) --- */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.614-1.485l-6.167 1.687zm6.447-5.644c.625.356 1.33 1.05 1.33 1.05s-.21.18-.336.251c-.127.071-.264.126-.41.166-.145.04-.3.06-.456.059-.157-.002-.314-.023-.47-.062-.156-.04-.308-.1-.455-.179a5.186 5.186 0 01-2.236-1.52c-.527-.58-.93-1.262-1.22-2.01-.29-.75-.435-1.55-.433-2.35.002-.8.147-1.598.438-2.348.29-.75.696-1.432 1.22-2.01.524-.58 1.16-1.048 1.875-1.405.715-.356 1.5-.578 2.31-.652.81-.073 1.628-.004 2.42.206.793.21 1.54.598 2.18 1.138.64.54 1.15 1.228 1.5 1.998.35.77.53 1.61.53 2.47h.001c-.003.85-.182 1.69-.53 2.46-.35.77-.86 1.458-1.5 1.998-.64.54-1.387.928-2.18 1.138-.792.21-1.61.278-2.42.205-.81-.074-1.595-.296-2.31-.652a5.182 5.182 0 01-1.875-1.405c-.12-.124-.23-.252-.33-.383s-.19-.26-.28-.39c-.09-.13-.17-.26-.25-.39-.08-.13-.14-.26-.2-.39-.06-.13-.11-.26-.15-.38a.5.5 0 01.11-.5c.06-.05.12-.09.18-.13.06-.04.13-.07.19-.1.06-.03.12-.05.18-.07.06-.02.13-.03.19-.03h.01a.5.5 0 01.45.28s.43.89.9 1.32c.47.43.98.64 1.5.64h.01c.52 0 1.02-.21 1.4-.59.38-.38.59-.88.59-1.4v-.01c0-.52-.21-1.02-.59-1.4s-.88-.59-1.4-.59h-.01c-.52 0-1.02.21-1.4.59-.38.38-.59.88-.59 1.4v.01c0 .02 0 .04.002.06.002.02.003.04.005.06h-.007z"/>
            </svg>
            <span className="font-semibold text-sm">Tanya Semi</span>
        </a>
    );
}
