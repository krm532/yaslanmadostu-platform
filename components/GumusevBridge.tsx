// YD1 CTO override 2 — GümüşEV deep-link continuity. Genel ziyaretçi tek
// yönlendirme taşır (brief §6). ?source=gumusev ile gelen kullanıcı zaten
// değerlendirme yapmış olduğundan aynı CTA'yı GÖRMEZ — "planına dön" copy'si
// ile GümüşEV Aile Paneli'ne yönlendirilir. Stateless: yalnız incoming
// `source` parametresi okunur; outbound link'e assessment/household/user id
// veya PII HİÇBİR query param olarak EKLENMEZ (attribution GümüşEV'in kendi
// offer_clicks tablosunda kalır, burada yeniden üretilmez).
const GUMUSEV_ASSESSMENT_URL = 'https://www.gumusev.org/tr/banyo';
const GUMUSEV_PLAN_URL = 'https://www.gumusev.org/tr/dashboard';

export default function GumusevBridge({
  fromGumusev, className,
}: {
  fromGumusev: boolean;
  className?: string;
}) {
  const href = fromGumusev ? GUMUSEV_PLAN_URL : GUMUSEV_ASSESSMENT_URL;
  const label = fromGumusev ? 'GümüşEV planına dön' : 'Evinizde hangi riskler var? Ücretsiz değerlendirme';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={
        className ??
        'inline-flex items-center gap-1.5 text-[14px] font-semibold text-white bg-navy hover:bg-turquoise transition-colors rounded-full px-5 py-2.5'
      }
    >
      {label} →
    </a>
  );
}
