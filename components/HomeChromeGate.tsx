'use client';

import { usePathname } from 'next/navigation';

// Ana sayfada (/) eski vitrin başlığı/alt bilgisi/bandı gösterilmez; diğer sayfalarda değişmez.
export default function HomeChromeGate({ children }: { children: React.ReactNode }) {
  return usePathname() === '/' ? null : <>{children}</>;
}
