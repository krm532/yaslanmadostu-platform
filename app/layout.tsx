import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import DisclosureBand from '@/components/DisclosureBand';
import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import HomeChromeGate from '@/components/HomeChromeGate';

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// YD1 §7 — noindex katman 1/2: metadata robots. Katman 2: public/robots.txt.
// İkisi de build raporunda fiziksel doğrulanır (ADIM YD1-D).
export const metadata: Metadata = {
  title: {
    default: 'YaslanmaDostu — Yaşlanma Dostu Ev Çözümleri Vitrini',
    template: '%s | YaslanmaDostu',
  },
  description:
    'Yaşlanma dostu ev için seçilmiş çözüm türlerini keşfedin. Temsili vitrin — GümüşAğ ekosisteminin ürün ve çözüm katalog gösterimi.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${cormorantGaramond.variable} ${inter.variable} font-sans`}>
        <HomeChromeGate>
          <DisclosureBand />
          <TopNav />
        </HomeChromeGate>
        <main>{children}</main>
        <HomeChromeGate>
          <Footer />
        </HomeChromeGate>
      </body>
    </html>
  );
}
