'use client';
import { useEffect } from 'react';

export default function TawkToScript() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://embed.tawk.to/683d7902cc42f619116825f8/1iso21d8n';
        script.async = true;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);
    }, []);

    return null; // No UI needed
}
