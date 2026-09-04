import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductPlaceholder from '@/components/ProductPlaceholder';
import GumusevBridge from '@/components/GumusevBridge';
import { CATALOG, CATEGORY_LABELS, getProductBySlug } from '@/lib/catalog';

const INSTALLATION_HOWTO: Record<'kendiniz' | 'usta_destegi', string> = {
  kendiniz: 'Ek montaj gerektirmez; kendiniz temin edip uygulayabilirsiniz.',
  usta_destegi: 'Sağlıklı bir sonuç için usta desteğiyle uygulanması önerilir.',
};

export function generateStaticParams() {
  return CATALOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Ürün bulunamadı' };
  return { title: product.title };
}

export default async function ProductPage({
  params, searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const fromGumusev = sp.source === 'gumusev';
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-[12px] text-dark/40 mb-6">
        <Link href="/" className="hover:text-turquoise">Ana Sayfa</Link>
        {' / '}
        <Link href={`/kategori/${product.category}`} className="hover:text-turquoise">
          {CATEGORY_LABELS[product.category]}
        </Link>
      </nav>

      <div className="mb-6">
        <ProductPlaceholder category={product.category} className="w-full max-w-xs mx-auto sm:mx-0 aspect-square rounded-2xl flex items-center justify-center" />
      </div>

      <h1 className="font-serif text-[28px] font-semibold text-navy leading-tight mb-1">{product.title}</h1>
      <p className="text-[12px] font-semibold text-dark/40 uppercase tracking-wide mb-6">Ürün tipi · Temsili vitrin</p>

      <div className="space-y-6 mb-10">
        <div>
          <h2 className="font-serif text-[16px] font-semibold text-navy mb-1.5">Ne işe yarar?</h2>
          <p className="text-[14px] text-dark/75 leading-relaxed">{product.whatItDoes}</p>
        </div>
        <div>
          <h2 className="font-serif text-[16px] font-semibold text-navy mb-1.5">Hangi ihtiyaca yanıt verir?</h2>
          <p className="text-[14px] text-dark/75 leading-relaxed">
            {product.whoItIsFor} İlgili ihtiyaç alanı: <span className="font-semibold text-turquoise">{product.relatedNeed}</span>.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-[16px] font-semibold text-navy mb-1.5">Nasıl uygulanır?</h2>
          <p className="text-[14px] text-dark/75 leading-relaxed">{INSTALLATION_HOWTO[product.installation]}</p>
        </div>
        <div>
          <h2 className="font-serif text-[16px] font-semibold text-navy mb-1.5">GümüşEV neden bunu önerebilir?</h2>
          <p className="text-[14px] text-dark/75 leading-relaxed">
            GümüşEV&apos;in ücretsiz ev güvenliği taramasında &quot;{product.relatedNeed}&quot; alanıyla ilişkilendirilen
            durumlarda bu çözüm türü, değerlendirme sonucunuzda öncelikli seçenekler arasında gösterilebilir.
          </p>
        </div>
      </div>

      {/* Üç katmanlı ifşa — sayfa düzeyi tam cümle (brief §5.2). */}
      <p className="text-[12px] text-dark/50 border-t border-silver-light pt-4 mb-8">
        Temsili ürün — satış yapılmamaktadır.
      </p>

      <div className="bg-warm-surface rounded-2xl p-6 text-center">
        <p className="font-serif text-[16px] font-semibold text-navy mb-2">
          {fromGumusev ? 'Değerlendirmenize devam edin' : 'Bu ihtiyacı kendi evinizde de kontrol edin'}
        </p>
        <p className="text-[13px] text-dark/60 mb-4 leading-relaxed">
          {fromGumusev
            ? 'Bu çözümü GümüşEV değerlendirmenizden geldiniz — planınıza kaldığınız yerden devam edebilirsiniz.'
            : 'Bu çözüm türünün evinize uygun olup olmadığını GümüşEV’in ücretsiz taramasıyla öğrenin.'}
        </p>
        <GumusevBridge fromGumusev={fromGumusev} />
      </div>
    </div>
  );
}
