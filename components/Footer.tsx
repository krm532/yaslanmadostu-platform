import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-serif text-[17px] font-semibold mb-2">YaslanmaDostu</p>
            <p className="text-[13px] text-silver leading-relaxed">
              GümüşAğ ekosisteminin çözüm ve ürün türü vitrini.
            </p>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-turquoise mb-2">Kategoriler</p>
            <ul className="space-y-1.5 text-[13px] text-silver">
              <li><Link href="/kategori/banyo-guvenligi" className="hover:text-white transition-colors">Banyo Güvenliği</Link></li>
              <li><Link href="/kategori/aydinlatma-ve-gece" className="hover:text-white transition-colors">Aydınlatma ve Gece</Link></li>
              <li><Link href="/kategori/gunluk-yasam-ve-erisim" className="hover:text-white transition-colors">Günlük Yaşam ve Erişim</Link></li>
              <li><Link href="/kategori/baglantili-cihazlar" className="hover:text-white transition-colors">Bağlantılı Cihazlar</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-turquoise mb-2">GümüşAğ Ekosistemi</p>
            <ul className="space-y-1.5 text-[13px] text-silver">
              <li><Link href="/hakkinda" className="hover:text-white transition-colors">Bu site nedir?</Link></li>
              <li>
                <a href="https://www.gumusev.org" target="_blank" rel="noopener" className="hover:text-white transition-colors">
                  GümüşEV — Ücretsiz Ev Değerlendirmesi
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Üç katmanlı temsili ifşa — katman 3: tam açıklama, footer'da. */}
        <p className="text-[11.5px] text-silver/80 leading-relaxed border-t border-white/10 pt-5">
          Bu sayfadaki ürünler temsilidir; satış yapılmamaktadır, stok ve fiyat bilgisi içermez.
          YaslanmaDostu, GümüşAğ ekosisteminin ürün ve çözüm vitrinidir.
        </p>
      </div>
    </footer>
  );
}
