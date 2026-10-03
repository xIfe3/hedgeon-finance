import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { PathWrapper } from "./path-wrapper";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import AOSWrapper from "@/components/public/AOSWrapper";
import GTranslateWidget from "@/components/Translate";
import TawkToScript from "@/components/public/TawkScript";
import 'antd/dist/reset.css'; // For Ant Design v5+



export const metadata: Metadata = {
    title: "Hedgeon Finance",
    description: "Hedgeon Finace Inc",
    icons: {
        icon: '/favicon.png',
    },

};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body>
                <Providers>
                    <SpeedInsights />
                    <Analytics />
                    <PathWrapper>
                        <AOSWrapper>
                            {children}

                            <GTranslateWidget />
                            <TawkToScript />
                        </AOSWrapper>
                    </PathWrapper>
                </Providers>
            </body>
        </html>
    );
}
