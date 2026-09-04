// ============================================================
// lib/catalog.ts — YD1 statik katalog.
// Kaynak: C:\Users\Kerem\Downloads\gumusev-platform\src\lib\solutions\
// registry.banyo.ts (READ-ONLY doğrulandı, 4 Eylül 2026). `title` ve
// `whatItDoes` alanları registry'nin title_tr/summary_tr alanlarından
// BİREBİR kopyalanmıştır — yeni fayda/koruma iddiası ÜRETİLMEMİŞTİR.
// `shortBenefit` yalnız kısaltmadır. `whoItIsFor`/`relatedNeed` risk
// alanından (match_risk_domains/risk_domain) türetilmiş nötr cümlelerdir;
// relatedNeed sözlüğü GümüşEV'in banyo.results.riskDomainLabels ile AYNIDIR.
// Yeni product_family_key İCAT EDİLMEMİŞTİR — yalnız bu 13 canonical key.
// ============================================================

export type InstallationLevel = 'kendiniz' | 'usta_destegi';

export type CategorySlug = 'banyo-guvenligi' | 'aydinlatma-ve-gece' | 'gunluk-yasam-ve-erisim';

export interface CatalogProduct {
  familyKey: string;
  slug: string;
  title: string;
  category: CategorySlug;
  shortBenefit: string;
  whatItDoes: string;
  whoItIsFor: string;
  installation: InstallationLevel;
  relatedNeed: string;
  imageDirection: string;
}

// Tek slug üretici — elle slug yazılmaz (brief §3).
export function familyKeyToSlug(familyKey: string): string {
  return familyKey.toLowerCase().replace(/_/g, '-');
}

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  'banyo-guvenligi': 'Banyo Güvenliği',
  'aydinlatma-ve-gece': 'Aydınlatma ve Gece',
  'gunluk-yasam-ve-erisim': 'Günlük Yaşam ve Erişim',
};

export const CATALOG: CatalogProduct[] = [
  {
    familyKey: 'NON_SLIP_BATH_MAT',
    slug: familyKeyToSlug('NON_SLIP_BATH_MAT'),
    title: 'Kaymaz Banyo Paspası',
    category: 'banyo-guvenligi',
    shortBenefit: 'Islak zeminde tutunmayı kolaylaştırır.',
    whatItDoes: 'Islak zeminlerde tutunmayı kolaylaştıran, hızlıca temin edilip kullanılabilecek bir başlangıç ürünü.',
    whoItIsFor: 'Banyoda zemin kayganlığıyla ilgili bir ihtiyaç belirlenen evler için uygun bir başlangıç seçeneğidir.',
    installation: 'kendiniz',
    relatedNeed: 'Kaygan zemin',
    imageDirection: 'Duş/küvet zeminine serilen, dokulu, kaymaz yüzeyli paspas — sıcak nötr ton.',
  },
  {
    familyKey: 'ANTI_SLIP_STRIP_TREATMENT',
    slug: familyKeyToSlug('ANTI_SLIP_STRIP_TREATMENT'),
    title: 'Kaydırmaz Zemin Bandı',
    category: 'banyo-guvenligi',
    shortBenefit: 'Zemine uygulanan kendinden yapışkanlı kaymaz bant.',
    whatItDoes: 'Duş veya küvet zeminine uygulanan, ıslak yüzeyde tutunmayı kolaylaştıran kendinden yapışkanlı bant.',
    whoItIsFor: 'Zemin kayganlığıyla ilgili bir ihtiyaç belirlenen evler için uygun bir seçenektir.',
    installation: 'kendiniz',
    relatedNeed: 'Kaygan zemin',
    imageDirection: 'Duş zeminine yapıştırılmış ince, dokulu şeritler.',
  },
  {
    familyKey: 'RAISED_TOILET_SEAT',
    slug: familyKeyToSlug('RAISED_TOILET_SEAT'),
    title: 'Klozet Yükseltici',
    category: 'banyo-guvenligi',
    shortBenefit: 'Oturma-kalkma hareketini kolaylaştıran, montajı basit yükseltici.',
    whatItDoes: 'Oturma ve kalkma hareketini kolaylaştıran, montajı basit klozet yükseltici.',
    whoItIsFor: 'Klozet kullanımıyla ilgili bir ihtiyaç belirlenen evler için uygun bir seçenektir.',
    installation: 'kendiniz',
    relatedNeed: 'Klozet kullanımı',
    imageDirection: 'Klozet üzerine oturan, kenarlarında tutamaç olan yükseltici halka.',
  },
  {
    familyKey: 'SHOWER_TRANSFER_BENCH',
    slug: familyKeyToSlug('SHOWER_TRANSFER_BENCH'),
    title: 'Duş Oturağı / Transfer Bankı',
    category: 'banyo-guvenligi',
    shortBenefit: 'Kaymaz ayaklı, duşta oturarak dinlenmeyi sağlayan oturak.',
    whatItDoes: 'Ayakta zorlanıldığında dinlenmeyi kolaylaştıran, kaymaz ayaklı duş oturağı.',
    whoItIsFor: 'Duşta ayakta durmakta zorlanmayla ilgili bir ihtiyaç belirlenen evler için uygun bir seçenektir.',
    installation: 'kendiniz',
    relatedNeed: 'Duş oturağı',
    imageDirection: 'Küvet kenarına oturan, kaymaz ayaklı sade oturma bankı.',
  },
  {
    familyKey: 'ADJUSTABLE_HAND_SHOWER',
    slug: familyKeyToSlug('ADJUSTABLE_HAND_SHOWER'),
    title: 'Ayarlanabilir El Duşu',
    category: 'banyo-guvenligi',
    shortBenefit: 'Hortumlu, yükseklik ayarlı el duşu seti.',
    whatItDoes: 'Oturarak yıkanmayı kolaylaştıran, hortumlu ve yükseklik ayarı yapılabilen el duşu seti.',
    whoItIsFor: 'Oturarak yıkanma ihtiyacı belirlenen evler için uygun bir seçenektir.',
    installation: 'kendiniz',
    relatedNeed: 'El duşu',
    imageDirection: 'Esnek hortumlu, kaymaz kavramalı el duşu başlığı.',
  },
  {
    familyKey: 'SHOWER_TEMPERATURE_INDICATOR',
    slug: familyKeyToSlug('SHOWER_TEMPERATURE_INDICATOR'),
    title: 'Duş Suyu Sıcaklık Göstergesi',
    category: 'banyo-guvenligi',
    shortBenefit: 'Su sıcaklığını görünür kılan, montajsız gösterge.',
    whatItDoes: 'Su sıcaklığını görünür kılan, montaj gerektirmeyen basit bir gösterge ürünü.',
    whoItIsFor: 'Sıcak su güvenliğiyle ilgili bir ihtiyaç belirlenen evler için uygun bir başlangıç seçeneğidir.',
    installation: 'kendiniz',
    relatedNeed: 'Sıcak su güvenliği',
    imageDirection: 'Musluk ağzına takılan, renk değiştiren sıcaklık göstergesi diski.',
  },
  {
    familyKey: 'THERMOSTATIC_MIXING_VALVE',
    slug: familyKeyToSlug('THERMOSTATIC_MIXING_VALVE'),
    title: 'Termostatik Karışım Valfi',
    category: 'banyo-guvenligi',
    shortBenefit: 'Su sıcaklığını sabit aralıkta tutan valf değişimi hizmeti.',
    whatItDoes: 'Su sıcaklığını güvenli aralıkta sabitleyen valf değişimi için teklif alınabilecek bir tesisat hizmeti.',
    whoItIsFor: 'Sıcak su güvenliğiyle ilgili, kalıcı/tesisat düzeyinde çözüm arayan evler için uygun bir seçenektir.',
    installation: 'usta_destegi',
    relatedNeed: 'Sıcak su güvenliği',
    imageDirection: 'Duvar içi tesisata bağlanan, sıcaklık kadranlı valf gövdesi.',
  },
  {
    familyKey: 'LEVER_FAUCET_UPGRADE',
    slug: familyKeyToSlug('LEVER_FAUCET_UPGRADE'),
    title: 'Kollu Batarya Dönüşümü',
    category: 'banyo-guvenligi',
    shortBenefit: 'Çevirme gerektirmeyen kollu/dokunmatik bataryaya geçiş hizmeti.',
    whatItDoes: 'Çevirme gerektirmeyen kollu veya dokunmatik bataryaya geçiş için teklif alınabilecek bir hizmet.',
    whoItIsFor: 'Musluk kullanımıyla ilgili bir ihtiyaç belirlenen evler için uygun bir seçenektir.',
    installation: 'usta_destegi',
    relatedNeed: 'Musluk kullanımı',
    imageDirection: 'Tek kollu, çevirme gerektirmeyen lavabo bataryası.',
  },
  {
    familyKey: 'MOTION_NIGHT_LIGHT',
    slug: familyKeyToSlug('MOTION_NIGHT_LIGHT'),
    title: 'Hareket Sensörlü Gece Lambası',
    category: 'aydinlatma-ve-gece',
    shortBenefit: 'Gece yolunu otomatik aydınlatan, montajsız lamba.',
    whatItDoes: 'Gece banyo yolunu otomatik aydınlatan, montaj gerektirmeyen pratik bir çözüm.',
    whoItIsFor: 'Gece aydınlatması veya banyo yoluyla ilgili bir ihtiyaç belirlenen evler için uygun bir başlangıç seçeneğidir.',
    installation: 'kendiniz',
    relatedNeed: 'Gece aydınlatması',
    imageDirection: 'Priz üstüne takılan, hareket algılayan küçük LED gece lambası.',
  },
  {
    familyKey: 'ILLUMINATED_PATH_SWITCH',
    slug: familyKeyToSlug('ILLUMINATED_PATH_SWITCH'),
    title: 'Aydınlatmalı Yol Anahtarı',
    category: 'aydinlatma-ve-gece',
    shortBenefit: 'Karanlıkta bulunabilen, montajı basit aydınlatmalı anahtar.',
    whatItDoes: 'Karanlıkta ilerlemeden ışığı açmaya imkân veren, montajı basit aydınlatmalı anahtar.',
    whoItIsFor: 'Gece aydınlatmasıyla ilgili bir ihtiyaç belirlenen evler için uygun bir seçenektir.',
    installation: 'kendiniz',
    relatedNeed: 'Gece aydınlatması',
    imageDirection: 'İçi hafif ışıklı, karanlıkta görünen düğme yüzeyi.',
  },
  {
    familyKey: 'ACCESSIBLE_ORGANIZER',
    slug: familyKeyToSlug('ACCESSIBLE_ORGANIZER'),
    title: 'Erişilebilir Banyo Düzenleyicisi',
    category: 'gunluk-yasam-ve-erisim',
    shortBenefit: 'Eşyaları eğilmeden erişilebilir konuma taşıyan düzenleyici.',
    whatItDoes: 'Sık kullanılan eşyaları eğilmeden veya uzanmadan erişilebilir konuma taşıyan düzenleme ürünü.',
    whoItIsFor: 'Eşyalara erişim mesafesiyle ilgili bir ihtiyaç belirlenen evler için uygun bir başlangıç seçeneğidir.',
    installation: 'kendiniz',
    relatedNeed: 'Donatı erişimi',
    imageDirection: 'Duvara asılan, bölmeli, kolay erişilebilir raf/organizer.',
  },
  {
    familyKey: 'REACHABLE_FIXTURE_KIT',
    slug: familyKeyToSlug('REACHABLE_FIXTURE_KIT'),
    title: 'Erişilebilir Donatı Yerleşimi',
    category: 'gunluk-yasam-ve-erisim',
    shortBenefit: 'Sabunluk/havluluk/anahtarları erişilebilir konuma taşıma hizmeti.',
    whatItDoes: 'Sabunluk, havluluk ve anahtarların kolay erişilebilir konuma taşınması için teklif alınabilecek bir hizmet.',
    whoItIsFor: 'Donatı erişimiyle ilgili, kalıcı yeniden yerleşim arayan evler için uygun bir seçenektir.',
    installation: 'usta_destegi',
    relatedNeed: 'Donatı erişimi',
    imageDirection: 'Yeniden konumlandırılmış sabunluk/havluluk yerleşim planı çizimi.',
  },
  {
    familyKey: 'SECURE_HOME_FOOTWEAR',
    slug: familyKeyToSlug('SECURE_HOME_FOOTWEAR'),
    title: 'Kaymaz Tabanlı Ev Ayakkabısı',
    category: 'gunluk-yasam-ve-erisim',
    shortBenefit: 'Ayağı saran, kaymaz tabanlı ev ayakkabısı.',
    whatItDoes: 'Ayağı saran, kaymaz tabanlı, evde her an kullanılabilecek bir ayakkabı seçeneği.',
    whoItIsFor: 'Zemin kayganlığı veya ayakkabı alışkanlığıyla ilgili bir ihtiyaç belirlenen evler için uygun bir başlangıç seçeneğidir.',
    installation: 'kendiniz',
    relatedNeed: 'Kaygan zemin',
    imageDirection: 'Ayağı tam saran, kaymaz tabanlı, kapalı ev ayakkabısı.',
  },
];

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): CatalogProduct[] {
  return CATALOG.filter((p) => p.category === category);
}
