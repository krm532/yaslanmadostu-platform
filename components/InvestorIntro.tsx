'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import styles from './InvestorIntro.module.css';

const PRODUCTS = [
  { image: 'medication-dispenser', title: 'Akıllı ilaç dağıtıcı', className: 'medication' },
  { image: 'sleep-sensor', title: 'Uyku Takip ve Düşme Uyarı Sistemleri', className: 'sleep' },
  { image: 'hip-airbag', title: 'Kalça koruyucu airbag', className: 'airbag' },
  { image: 'daily-solutions', title: 'Hızlı Risk Azaltma Çözümleri', className: 'daily' },
] as const;

const JOURNEY = [
  { title: 'Tarama', owner: 'GümüşEV', detail: 'Evdeki riskleri belirler' },
  { title: 'İhtiyaç', owner: 'Kişiye özel öneri', detail: 'Öncelikleri netleştirir' },
  { title: 'Ürün ve hizmet', owner: 'YaslanmaDostu + Tadilat', detail: 'İhtiyacı çözüme taşır' },
  { title: 'Aile takibi', owner: 'GümüşEV Aile Paneli', detail: 'Atılan adımları bir araya getirir' },
];

export default function InvestorIntro() {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const destination = useRef<HTMLElement | null>(null);
  const upgrading = useRef(false);

  const restorePage = useCallback(() => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }, []);

  const open = useCallback(() => {
    const element = dialog.current;
    if (!element || element.matches(':modal')) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    // The server sends the dialog already open so it is visible from first paint, before any
    // script loads. Upgrade that non-modal copy to a modal one; its queued close event is ignored.
    if (element.open) {
      upgrading.current = true;
      element.close();
    }
    element.showModal();
    element.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    // Open immediately after mounting on every full page load, independent of storage or URL.
    // Scheduling also lets Strict Mode cancel its first effect before opening the dialog.
    const timer = window.setTimeout(open, 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => () => restorePage(), [restorePage]);

  function explore() {
    destination.current = document.getElementById('cozum-seckisi');
    dialog.current?.close();
  }

  function onClose() {
    if (upgrading.current) {
      upgrading.current = false;
      return;
    }
    restorePage();
    const target = destination.current;
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      destination.current = null;
    } else {
      const prior = previousFocus.current;
      if (prior && prior !== document.body && prior.isConnected) prior.focus({ preventScroll: true });
    }
  }

  return (
    <>
      <noscript><style>{'#investor-intro{display:none!important}'}</style></noscript>
      <dialog
        ref={dialog}
        open
        id="investor-intro"
        className={styles.dialog}
        aria-labelledby="investor-intro-title"
        aria-describedby="investor-intro-description"
        onClose={onClose}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]');
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
        }}
      >
        <div className={styles.shell}>
          <button className={styles.close} type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Tanıtımı kapat">
            <span aria-hidden="true">×</span>
          </button>
          <div className={styles.main}>
            <div className={styles.story}>
              <Image
                className={styles.brandLogo}
                src="/images/investor-intro/yaslanmadostu-logo.png"
                alt="Yaşlanma Dostu — Değişen İhtiyaçlara Uygun Çözümler"
                width={2883}
                height={1453}
                sizes="(max-width: 640px) 240px, 260px"
              />
              <p className={styles.eyebrow}>GümüşEV ekosisteminin ticaret vizyonu</p>
              <h2 id="investor-intro-title" className={styles.title}>İlk Günden <br /><em>İyileştirmelere Başlayın.</em></h2>
              <p id="investor-intro-description" className={styles.description}>
                Sağlıklı ve güvenli yaşlanmak için zaman kaybetmeden harekete geçin. Evdeki riskleri azaltmaya yardımcı ürünler, akıllı sistemler ve uygulama çözümleri burada bir araya gelecek.
              </p>
              <p className={styles.groups}>GümüşEV taramasında belirlenen ihtiyaçların, burada uygun ürün ve çözümlerin <strong>satın alınmasına dönüşmesini hedefliyoruz.</strong></p>
              <div className={styles.actions}>
                <button className={styles.primary} type="button" onClick={explore}>Çözüm gruplarını keşfet <span aria-hidden="true">↗</span></button>
                <button className={styles.secondary} type="button" onClick={() => dialog.current?.close()}>Kapat</button>
              </div>
              <p className={styles.status}><strong>Bugün çözüm vitrini.</strong> Ürün ve hizmet satışı ile cihaz entegrasyonları gelecek vizyonumuz.</p>
            </div>
            <div className={styles.visual}>
              <p className={styles.visualEyebrow}>İhtiyaçtan doğan ürün seçkisi</p>
              <div className={styles.collage}>
                {PRODUCTS.map((product) => (
                  <figure key={product.image} className={`${styles.product} ${styles[product.className]}`}>
                    <Image src={`/images/investor-intro/${product.image}.webp`} alt={product.title} fill sizes="(max-width: 640px) 43vw, 220px" />
                    <figcaption>{product.title}</figcaption>
                  </figure>
                ))}
              </div>
              <div className={styles.service}>
                <Image src="/images/investor-intro/bathroom-adaptation.webp" alt="Tutunma desteği içeren banyo dönüşümü örneği" width={58} height={58} />
                <div><strong>Üründen yerinde uygulamaya</strong><span>Aydınlatma, banyo ve erişilebilir dönüşüm</span></div>
              </div>
              <p className={styles.caption}>Sunumdaki örnek ürün ve çözüm grupları</p>
            </div>
          </div>
          <div className={styles.ecosystem}>
            <p className={styles.flowLabel}>Birbirini tamamlayan bir ekosistem</p>
            <ol className={styles.journey}>
              {JOURNEY.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                  <div><strong>{step.title}</strong><span>{step.owner}</span><small>{step.detail}</small></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </dialog>
    </>
  );
}
