import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';
import ProductPlaceholder from './ProductPlaceholder';

const INSTALLATION_LABEL: Record<CatalogProduct['installation'], string> = {
  kendiniz: 'Kendiniz uygulayabilirsiniz',
  usta_destegi: 'Usta desteği önerilir',
};

export default function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/urun/${product.slug}`}
      className="block bg-white rounded-2xl border border-silver-light overflow-hidden hover:border-turquoise transition-colors"
    >
      <div className="p-4">
        <ProductPlaceholder category={product.category} />
      </div>
      <div className="px-4 pb-4">
        {/* Üç katmanlı ifşa — katman 2: kartta küçük, tek satır (CTO override 4). */}
        <p className="text-[10.5px] font-semibold text-dark/40 uppercase tracking-wide mb-1">Temsili ürün tipi</p>
        <h3 className="font-serif text-[16px] font-semibold text-navy leading-snug mb-1">{product.title}</h3>
        <p className="text-[13px] text-dark/70 leading-relaxed mb-2">{product.shortBenefit}</p>
        <div className="flex items-center justify-between text-[11.5px] text-dark/50">
          <span>{product.relatedNeed}</span>
          <span>{INSTALLATION_LABEL[product.installation]}</span>
        </div>
      </div>
    </Link>
  );
}
