"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export function PathWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showHeader = !pathname.startsWith("/admin") && !pathname.startsWith("/personal") && !pathname.startsWith("/auth");

    return (
        <>
            {showHeader && <Header />}
            {children}
            {showHeader && <Footer />}
        </>
    );
}
