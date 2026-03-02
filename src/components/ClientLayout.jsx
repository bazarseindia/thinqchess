"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteDataProvider } from "@/components/SiteDataContext";

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <SessionProvider>
            <ThemeProvider>
                <SiteDataProvider>
                    {!isAdmin && <Navbar />}
                    {children}
                    {!isAdmin && <Footer />}
                    {!isAdmin && <WhatsAppButton />}
                </SiteDataProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
