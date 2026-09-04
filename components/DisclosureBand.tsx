// Üç katmanlı temsili ifşa — katman 1: global üst bant, HER sayfada
// (root layout içinden render edilir). Katman 2 (kart) ve katman 3
// (footer) ayrı bileşenlerde. CTO override 4: global bant kısa ve sakin
// kalır ("TEMSİLİ VİTRİN"), sitenin oyuncak/demo dashboard hissi vermemesi
// için büyük rozet/renk patlaması YOK.
export default function DisclosureBand() {
  return (
    <div className="bg-navy text-silver-light text-center text-[11px] font-semibold uppercase tracking-widest py-1.5">
      Temsili Vitrin
    </div>
  );
}
