import type { Metadata } from 'next';
import { Cormorant_Garamond, Handlee } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const cormorant = Cormorant_Garamond({
    variable: '--font-cormorant',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

const handlee = Handlee({
    variable: '--font-handlee',
    subsets: ['latin'],
    weight: ['400'],
});

export const metadata: Metadata = {
    title: 'Dear Failure',
    description:
        'Write a letter to the moments that made you grow. An anonymous letter archive celebrating failure as growth.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${cormorant.variable} ${handlee.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
