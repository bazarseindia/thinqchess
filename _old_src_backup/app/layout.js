import React from 'react';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
    title: "ThinQ Chess Academy | Elite Strategic Mentorship",
    description: "Nurturing young minds through the strategic power of chess. Join our academy in Bangalore or Online.",
    icons: {
        icon: '/favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning={true} className="overflow-x-hidden">
                <ThemeProvider>
                    <Navbar />
                    {children}
                    <Footer />
                    <WhatsAppButton />
                </ThemeProvider>
            </body>
        </html>
    );
}
