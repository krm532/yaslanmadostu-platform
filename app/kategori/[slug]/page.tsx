import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import GumusevBridge from '@/components/GumusevBridge';
import { CATEGORY_LABELS, getProductsByCategory, type CategorySlug } from '@/lib/catalog';

const REAL_CATEGORY_SLUGS: CategorySlug[] = ['banyo-guvenligi', 'aydinlatma-ve-gece', 'gunluk-yasam-ve-erisim'];
const ALL_SLUGS = [...REAL_CATEGORY_SLUGS, 'baglantili-cihazlar'] as const;

const CATEGORY_INTRO: Record<CategorySlug, string> = {
  'banyo-guvenligi': 'Banyoda kayganlık, sıcak su güvenliği ve transfer ihtiyaçlarına yönelik seçilmiş çözüm türleri.',
  'aydinlatma-ve-gece': 'Gece banyo yolunu ve aydınlatmayı ilgilendiren seçilmiş çözüm türleri.',
  'gunluk-yasam-ve-erisim': 'Günlük eşyalara erişimi ve ev içi hareketi kolaylaştıran seçilmiş çözüm türleri.',
};

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug === 'baglantili-cihazlar' ? 'Bağlantılı Cihazlar' : CATEGORY_LABELS[slug as CategorySlug];
  return { title: title ?? 'Kategori' };
}

export default async function CategoryPage({
  params, searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const fromGumusev = sp.source === 'gumusev';

  if (!ALL_SLUGS.includes(slug as (typeof ALL_SLUGS)[number])) {
    notFound();
  }

  if (slug === 'baglantili-cihazlar') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <span className="inline-block text-[11px] font-semibold text-turquoise bg-turquoise/10 px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Yakında
        </span>
        <h1 className="font-serif text-[26px] font-semibold text-navy mb-4">Bağlantılı Cihazlar</h1>
        <p className="text-[14px] text-dark/70 leading-relaxed mb-3 max-w-xl mx-auto">
          Evi dinleyen, düşme ve hareket sinyallerini takip eden bağlantılı cihaz çözümleri bu kategoride
          yer alacak. Bu bölüm henüz bir ürün vitrinine açılmadı — yalnız kategori anlatımıdır.
        </p>
        <p className="text-[13px] text-dark/50 leading-relaxed mb-8 max-w-xl mx-auto">
          GümüşEV Aile Paneli'ndeki Canlı Takip kartı bu yöndeki ilk temsili gösterimi barındırır.
        </p>
        <GumusevBridge fromGumusev={fromGumusev} />
      </div>
    );
  }

  const category = slug as CategorySlug;
  const products = getProductsByCategory(category);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-serif text-[26px] font-semibold text-navy mb-2">{CATEGORY_LABELS[category]}</h1>
      <p className="text-[13.5px] text-dark/60 leading-relaxed mb-8 max-w-xl">{CATEGORY_INTRO[category]}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-12">
        {products.map((p) => (
          <ProductCard key={p.familyKey} product={p} />
        ))}
      </div>
      <div className="border-t border-silver-light pt-8 text-center">
        <p className="text-[13.5px] text-dark/60 mb-4">Bu kategorinin sizin eviniz için uygun olup olmadığından emin değil misiniz?</p>
        <GumusevBridge fromGumusev={fromGumusev} />
      </div>
    </div>
  );
}
