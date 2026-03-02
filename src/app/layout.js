import React from 'react';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

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
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
