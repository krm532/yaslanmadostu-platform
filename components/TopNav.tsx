import Link from 'next/link';

const CATEGORIES = [
  { slug: 'banyo-guvenligi', label: 'Banyo Güvenliği' },
  { slug: 'aydinlatma-ve-gece', label: 'Aydınlatma ve Gece' },
  { slug: 'gunluk-yasam-ve-erisim', label: 'Günlük Yaşam ve Erişim' },
];

export default function TopNav() {
  return (
    <header className="bg-white border-b border-silver-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2 L21 9 V21 H15 V14 H9 V21 H3 V9 Z" stroke="#172645" strokeWidth="1.8" strokeLinejoin="round" fill="#F8F7F4" />
          </svg>
          <span className="font-serif text-[19px] font-semibold text-navy leading-none">YaslanmaDostu</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className="text-[13px] font-medium text-dark/70 hover:text-turquoise transition-colors"
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/kategori/baglantili-cihazlar"
            className="text-[13px] font-medium text-dark/70 hover:text-turquoise transition-colors"
          >
            Bağlantılı Cihazlar
          </Link>
          <Link
            href="/hakkinda"
            className="text-[13px] font-medium text-dark/70 hover:text-turquoise transition-colors"
          >
            Hakkında
          </Link>
        </nav>
      </div>
    </header>
  );
}
