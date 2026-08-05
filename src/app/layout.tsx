import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeCursor } from '@/components/ui/ThemeCursor';
import { BottomNav } from '@/components/ui/BottomNav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'MemoryBloom — Turn Memories into Magic',
  description: 'An Awwwards-grade digital gifting platform created to make receivers cry from happiness.',
  openGraph: {
    title: 'MemoryBloom — Turn Memories into Magic',
    description: 'Create unforgettable digital gifts with AI story chapters, constellation reveals, and 3D gift wrapping.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white`}>
        <ThemeCursor />
        <main className="min-h-screen pb-16 sm:pb-0">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
