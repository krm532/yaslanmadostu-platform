import type { CategorySlug } from '@/lib/catalog';

// Gerçek fotoğraf YOK (brief §4). Sade CSS/SVG placeholder: kategoriye göre
// renklenen zemin + jenerik, marka taşımayan bir ikon. Ürün-özel gerçekçi
// görsel iddia edilmez — yalnız kategori düzeyinde görsel yönlendirme.
const CATEGORY_BG: Record<CategorySlug, string> = {
  'banyo-guvenligi': '#E6F5F3',
  'aydinlatma-ve-gece': '#FBF3E3',
  'gunluk-yasam-ve-erisim': '#EEF0F5',
};
const CATEGORY_ICON_COLOR: Record<CategorySlug, string> = {
  'banyo-guvenligi': '#14b8a6',
  'aydinlatma-ve-gece': '#c98a1f',
  'gunluk-yasam-ve-erisim': '#172645',
};

function CategoryIcon({ category, color }: { category: CategorySlug; color: string }) {
  if (category === 'aydinlatma-ve-gece') {
    return (
      <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (category === 'gunluk-yasam-ve-erisim') {
    return (
      <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.6" />
        <path d="M4 10h16M10 10v10" stroke={color} strokeWidth="1.6" />
      </svg>
    );
  }
  // banyo-guvenligi (varsayılan) — su damlası
  return (
    <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3c3.5 4.2 6 7.6 6 10.6A6 6 0 1 1 6 13.6C6 10.6 8.5 7.2 12 3Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductPlaceholder({
  category, className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  return (
    <div
      className={className ?? 'w-full aspect-square rounded-xl flex items-center justify-center'}
      style={{ background: CATEGORY_BG[category] }}
    >
      <CategoryIcon category={category} color={CATEGORY_ICON_COLOR[category]} />
    </div>
  );
}
