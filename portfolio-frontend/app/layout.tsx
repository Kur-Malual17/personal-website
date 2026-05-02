import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NetworkBackground from '@/components/NetworkBackground';

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kur Malual | Full-Stack Software Engineer',
  description: 'Software Engineer & CS student. Building scalable platforms for schools, farms, and commerce — with real users from day one.',
  openGraph: {
    title: 'Kur Malual | Full-Stack Software Engineer',
    description: 'Software Engineer & CS student. Building scalable platforms for schools, farms, and commerce.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}>
        <NetworkBackground />
        <div style={{ width: '100%', overflowX: 'hidden', position: 'relative', zIndex: 1 }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
