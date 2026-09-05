import type { Metadata } from 'next';
import GumusevBridge from '@/components/GumusevBridge';

export const metadata: Metadata = { title: 'Hakkında' };

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-serif text-[26px] font-semibold text-navy mb-6">Bu site nedir?</h1>

      <p className="text-[15px] font-semibold text-navy mb-6">
        YaslanmaDostu, GümüşEV ev değerlendirmesinin işaret ettiği çözüm türlerini gösteren bir vitrindir.
      </p>

      <div className="space-y-5 text-[14.5px] text-dark/75 leading-relaxed">
        <p>
          YaslanmaDostu, <strong className="text-navy">GümüşAğ Yaşlanma Dostu Yaşam Ağı Derneği</strong> ekosisteminin
          bir parçasıdır. GümüşEV evinizdeki riskleri değerlendirirken, YaslanmaDostu o değerlendirmenin işaret ettiği
          çözüm türlerini somutlaştırır.
        </p>
        <p>
          Bu sayfadaki tüm ürünler <strong className="text-navy">temsilidir</strong>. Marka, fiyat, stok bilgisi taşımaz;
          satış yapılmaz, sipariş alınmaz. Amaç, hangi tür çözümlerin var olduğunu anlaşılır kılmaktır. Bu bir çözüm
          vitrinidir.
        </p>

        <h2 className="font-serif text-[17px] font-semibold text-navy mt-9 mb-3">Neden marka ve fiyat yok?</h2>
        <p>
          Önce hangi çözüm sınıfının ihtiyaca karşılık geldiğini gösteriyoruz. Marka, model, fiyat ve sağlayıcı seçimi
          sonraki katmandır. Ticari bir ilişki, GümüşEV değerlendirmesinin sonucunu veya önerilen çözüm sınıfını
          değiştirmez.
        </p>

        <h2 className="font-serif text-[17px] font-semibold text-navy mt-9 mb-3">Ne temsili, ne gerçek?</h2>
        <p>
          <strong className="text-navy">Gerçek:</strong>
        </p>
        <ul className="text-[14px] list-disc pl-5 space-y-1.5">
          <li>GümüşEV ev değerlendirmesi ücretsizdir ve çalışır durumdadır</li>
          <li>Buradaki çözüm türleri gerçek ihtiyaç alanlarına karşılık gelir</li>
          <li>Yerinde uygulama gerektiren çözümler için keşif ve hizmet yolu sunulur</li>
          <li>Tamamlanan adımlar Aile Paneli&apos;nde takip edilir</li>
        </ul>
        <p>
          <strong className="text-navy">Temsili:</strong>
        </p>
        <ul className="text-[14px] list-disc pl-5 space-y-1.5">
          <li>Ürün görselleri ve ürün tipleri</li>
          <li>Marka, fiyat ve stok bilgisi yoktur</li>
          <li>Satış yapılmaz, sipariş alınmaz</li>
        </ul>

        <p>
          Bugün burada gördüğünüz 13 çözüm türü, evdeki tüm ihtiyaçları kapsayan eksiksiz bir katalog değil,
          <strong className="text-navy"> ilk çözüm seçkimizdir</strong>. Bağlantılı Cihazlar kategorisi gibi bazı alanlar
          henüz ürün vitrinine açılmamıştır.
        </p>
        <p>
          Yerinde uygulama gerektiren çözümler için <strong className="text-navy">Yaşlanma Dostu Tadilat</strong> üzerinden
          keşif ve hizmet yolu sunulur. Tamamlanan adımlar, GümüşEV Aile Paneli üzerinden ailenizle birlikte takip edilir.
        </p>
      </div>

      <div className="mt-10 bg-warm-surface rounded-2xl p-6 text-center">
        <p className="font-serif text-[16px] font-semibold text-navy mb-3">Kendi eviniz için başlayın</p>
        <GumusevBridge fromGumusev={false} />
      </div>
    </div>
  );
}
