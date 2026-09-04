import type { Metadata } from 'next';
import GumusevBridge from '@/components/GumusevBridge';

export const metadata: Metadata = { title: 'Hakkında' };

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-serif text-[26px] font-semibold text-navy mb-6">Bu site nedir?</h1>

      <div className="space-y-5 text-[14.5px] text-dark/75 leading-relaxed">
        <p>
          YaslanmaDostu, <strong className="text-navy">GümüşAğ Yaşlanma Dostu Yaşam Ağı Derneği</strong> ekosisteminin
          bir parçasıdır. GümüşEV evinizdeki riskleri değerlendirirken, YaslanmaDostu o değerlendirmenin işaret ettiği
          çözüm türlerini somutlaştırır.
        </p>
        <p>
          Bu sayfadaki tüm ürünler <strong className="text-navy">temsilidir</strong>. Marka, fiyat, stok bilgisi taşımaz;
          satış yapılmaz, sipariş alınmaz. Amaç, hangi tür çözümlerin var olduğunu anlaşılır kılmaktır — bir mağaza değil,
          bir çözüm vitrinidir.
        </p>
        <p>
          Bugün burada gördüğünüz 13 çözüm türü, evdeki tüm ihtiyaçları kapsayan eksiksiz bir katalog değil,
          <strong className="text-navy"> ilk çözüm seçkimizdir</strong>. Bağlantılı Cihazlar kategorisi gibi bazı alanlar
          henüz ürün vitrinine açılmamıştır.
        </p>
        <p>
          Yerinde uygulama gerektiren işler <strong className="text-navy">Yaşlanma Dostu Tadilat</strong> saha ekibi
          tarafından değerlendirilir. Tamamlanan adımlar, GümüşEV Aile Paneli üzerinden ailenizle birlikte takip edilir.
        </p>
      </div>

      <div className="mt-10 bg-warm-surface rounded-2xl p-6 text-center">
        <p className="font-serif text-[16px] font-semibold text-navy mb-3">Kendi eviniz için başlayın</p>
        <GumusevBridge fromGumusev={false} />
      </div>
    </div>
  );
}
