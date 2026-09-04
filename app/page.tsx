import Link from 'next/link';
import GumusevBridge from '@/components/GumusevBridge';
import { CATEGORY_LABELS, getProductsByCategory, type CategorySlug } from '@/lib/catalog';

const CHAIN = [
  { step: '1', title: 'Değerlendirme', owner: 'GümüşEV', desc: 'Evinizdeki riskleri ücretsiz taramayla belirleyin.' },
  { step: '2', title: 'Çözüm', owner: 'YaslanmaDostu', desc: 'İhtiyaca uygun çözüm türlerini keşfedin.' },
  { step: '3', title: 'Yerinde Uygulama', owner: 'Yaşlanma Dostu Tadilat', desc: 'Gerektiğinde saha ekibiyle uygulamaya geçin.' },
  { step: '4', title: 'Takip', owner: 'Aile Paneli', desc: 'İlerlemeyi ailenizle birlikte takip edin.' },
];

const CATEGORIES: { slug: CategorySlug | 'baglantili-cihazlar'; comingSoon?: boolean }[] = [
  { slug: 'banyo-guvenligi' },
  { slug: 'aydinlatma-ve-gece' },
  { slug: 'gunluk-yasam-ve-erisim' },
  { slug: 'baglantili-cihazlar', comingSoon: true },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const fromGumusev = sp.source === 'gumusev';

  return (
    <div>
      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <p className="text-turquoise text-[12px] font-semibold uppercase tracking-widest mb-4">Temsili Vitrin</p>
          <h1 className="font-serif text-[30px] sm:text-[42px] font-semibold leading-tight mb-5">
            GümüşEV neden ihtiyacınız olduğunu söyler;<br className="hidden sm:block" /> YaslanmaDostu o ihtiyacın somut çözümünü gösterir.
          </h1>
          <p className="text-silver-light text-[15px] sm:text-[16px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Yaşlanma dostu ev için seçilmiş çözüm türlerini keşfedin. Fiyat, stok veya sipariş bilgisi içermez —
            bu bir çözüm vitrinidir.
          </p>
          <GumusevBridge fromGumusev={fromGumusev} />
        </div>
      </section>

      {/* ZİNCİR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="font-serif text-[22px] font-semibold text-navy text-center mb-10">
          Değerlendirmeden takibe, tek bir zincir
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {CHAIN.map((c) => (
            <div key={c.step} className="text-center">
              <div className="w-9 h-9 rounded-full bg-turquoise/10 text-turquoise font-serif font-semibold text-[15px] flex items-center justify-center mx-auto mb-3">
                {c.step}
              </div>
              <p className="font-serif text-[16px] font-semibold text-navy mb-0.5">{c.title}</p>
              <p className="text-[11.5px] font-semibold text-turquoise uppercase tracking-wide mb-1.5">{c.owner}</p>
              <p className="text-[13px] text-dark/60 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KATEGORİLER — CTO override 3: "ilk seçki", tüm katalog iddiası yok */}
      <section className="bg-warm-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-[22px] font-semibold text-navy text-center mb-2">
            İlk çözüm seçkimizle başlayın
          </h2>
          <p className="text-[13.5px] text-dark/60 text-center max-w-xl mx-auto mb-10">
            Yaşlanma dostu ev için seçilmiş çözüm türlerini keşfedin — bu, evdeki tüm ihtiyaçları kapsayan
            eksiksiz bir katalog değil, ilk seçkidir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CATEGORIES.map((cat) => {
              const count = cat.comingSoon ? 0 : getProductsByCategory(cat.slug as CategorySlug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/kategori/${cat.slug}`}
                  className="block bg-white rounded-2xl border border-silver-light p-6 hover:border-turquoise transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-[18px] font-semibold text-navy">
                      {cat.comingSoon ? 'Bağlantılı Cihazlar' : CATEGORY_LABELS[cat.slug as CategorySlug]}
                    </h3>
                    {cat.comingSoon ? (
                      <span className="text-[10.5px] font-semibold text-turquoise bg-turquoise/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Yakında
                      </span>
                    ) : (
                      <span className="text-[12px] text-dark/40">{count} çözüm türü</span>
                    )}
                  </div>
                  <p className="text-[13px] text-dark/60 leading-relaxed">
                    {cat.comingSoon
                      ? 'Evi dinleyen bağlantılı cihaz çözümleri — bu kategori henüz ürün vitrinine açılmadı.'
                      : 'Kategoriyi görüntüleyin →'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALT KÖPRÜ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="font-serif text-[20px] font-semibold text-navy mb-3">Önce evinizi değerlendirin</p>
        <p className="text-[13.5px] text-dark/60 mb-6 leading-relaxed">
          Hangi çözüm türünün size uygun olduğunu anlamanın en iyi yolu, GümüşEV'in ücretsiz ev değerlendirmesiyle başlamaktır.
        </p>
        <GumusevBridge fromGumusev={fromGumusev} />
      </section>
    </div>
  );
}
