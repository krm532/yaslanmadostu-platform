import Image from 'next/image';
import styles from './ComingSoonHome.module.css';

const BACKDROP = ['medication-dispenser', 'sleep-sensor', 'hip-airbag', 'daily-solutions', 'bathroom-adaptation'] as const;

const SOLUTIONS = ['Akıllı ilaç dağıtıcı', 'Uyku Takip ve Düşme Uyarı Sistemleri', 'Kalça koruyucu airbag', 'Hızlı Risk Azaltma Çözümleri'];

export default function ComingSoonHome() {
  return (
    <div className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        {BACKDROP.map((image, index) => (
          <div key={image} className={`${styles.blob} ${styles[`blob${index + 1}`]}`}>
            <Image src={`/images/investor-intro/${image}.webp`} alt="" aria-hidden="true" fill sizes="60vw" quality={40} />
          </div>
        ))}
        <div className={styles.wash} />
      </div>

      <div className={styles.content}>
        <Image
          className={`${styles.logo} ${styles.reveal}`}
          style={{ '--i': 0 } as React.CSSProperties}
          src="/images/investor-intro/yaslanmadostu-logo.png"
          alt="Yaşlanma Dostu — Değişen İhtiyaçlara Uygun Çözümler"
          width={2883}
          height={1453}
          sizes="(max-width: 640px) 200px, 240px"
          priority
        />
        <p className={`${styles.eyebrow} ${styles.reveal}`} style={{ '--i': 1 } as React.CSSProperties}>
          <span className={styles.pulse} aria-hidden="true" />
          GümüşEV ekosisteminin çözüm vitrini
        </p>
        <h1 className={`${styles.title} ${styles.reveal}`} style={{ '--i': 2 } as React.CSSProperties}>
          Çok yakında burada.<br />
          <em>İhtiyaçtan çözüme tek adres.</em>
        </h1>
        <p className={`${styles.description} ${styles.reveal}`} style={{ '--i': 3 } as React.CSSProperties}>
          GümüşEV taramasında öne çıkan ihtiyaçlar için seçilmiş ürünler, akıllı sistemler ve evde uygulama hizmetleri burada bir araya geliyor.
        </p>
        <div className={styles.flow} aria-hidden="true" />

        <section id="cozum-seckisi" tabIndex={-1} className={styles.solutions} aria-labelledby="cozum-gruplari-baslik">
          <h2 id="cozum-gruplari-baslik" className={`${styles.groupsTitle} ${styles.reveal}`} style={{ '--i': 4 } as React.CSSProperties}>
            Hazırlanan çözüm grupları
          </h2>
          <ul className={styles.cards}>
            {SOLUTIONS.map((title, index) => (
              <li key={title} className={`${styles.card} ${styles.reveal}`} style={{ '--i': 5 + index } as React.CSSProperties}>
                {title}
              </li>
            ))}
            <li className={`${styles.card} ${styles.cardWide} ${styles.reveal}`} style={{ '--i': 9 } as React.CSSProperties}>
              <strong>Üründen yerinde uygulamaya</strong>
              <span>Aydınlatma, banyo ve erişilebilir dönüşüm</span>
            </li>
          </ul>
        </section>

        <p className={`${styles.honest} ${styles.reveal}`} style={{ '--i': 10 } as React.CSSProperties}>
          Satış henüz başlamadı. Ürünler ve hizmetler hazır olduğunda bu sayfa açılacak.
        </p>
        <a className={`${styles.cta} ${styles.reveal}`} style={{ '--i': 11 } as React.CSSProperties} href="https://www.gumusev.org/tr">
          Bu arada evinizi GümüşEV ile tarayın
        </a>
      </div>
    </div>
  );
}
