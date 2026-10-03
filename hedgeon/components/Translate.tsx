// components/GTranslateWidget.tsx
"use client";

import Script from 'next/script';

export default function GTranslateWidget() {
    return (
        <>
            <div className="gtranslate_wrapper"></div>
            <Script
                id="gtranslate-settings"
                dangerouslySetInnerHTML={{
                    __html: `
            window.gtranslateSettings = {
              default_language: "en",
              detect_browser_language: true,
              wrapper_selector: ".gtranslate_wrapper",
              flag_style: "3d"
            };
          `
                }}
            />
            <Script
                strategy="afterInteractive"
                src="https://cdn.gtranslate.net/widgets/latest/float.js"
            />
        </>
    );
}