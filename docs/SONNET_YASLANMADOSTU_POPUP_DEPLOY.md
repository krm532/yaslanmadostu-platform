# Sonnet — YaslanmaDostu onaylı popup yayın teslimi

Hazırlanma: 2026-10-02 UTC. Bu belge yayın uygulayıcısı Sonnet içindir. Hazırlayan ajan commit, push, merge veya deploy yapmadı. Kullanıcı yayın görevini Sonnet'e verdi.

## Amaç ve sınırlar

Mevcut yerel kodu, mevcut https://yaslanmadostu.com/ sitesinin yerine aynı mevcut Vercel projesinde yayınla. Tasarım onaylıdır; yeniden tasarım, metin/ürün görseli değişikliği veya kaynak araştırması yapma. Arka planda mevcut vitrin/siluet kalır. Gerçek ödeme/sipariş, backend veya cihaz entegrasyonu ekleme. Başka projeye müdahale, yeni Vercel proje/domain, DNS, DB, environment variable veya güvenlik ayarı değişikliği yok. Secret/env değerlerini belgeye, commit'e, terminal raporuna veya kullanıcı yanıtına yazma.

Popup her tam ana sayfa açılışında/yenilemede, yeni sekme ve browser session'da hydration sonrasında doğrudan açılır. Eski sessionStorage flag'i artık okunmaz/yazılmaz. Açma effect'i sabit callback'e bağlı, sıfır gecikmeli iptal edilebilir timer kullanır; kapattıktan sonra aynı mount içindeki render'larda yeniden açılmaz. Query/hash ile tam ana sayfa açılışı da popup gösterir. Kapatma, backdrop, Escape, Tab/Shift+Tab focus sınırı, scroll/focus restorasyonu, "Ticaret vizyonu" ile yeniden açma ve "Çözüm gruplarını keşfet" CTA'sı korunmuştur. Kategori/ürün sayfaları popup içermez.

Başlık: **İlk Günden İyileştirmelere Başlayın.** Kartlar dahil tüm onaylı metinler aynen kalır; özellikle "Uyku Takip ve Düşme Uyarı Sistemleri" ve "Hızlı Risk Azaltma Çözümleri". Logo `public/images/investor-intro/yaslanmadostu-logo.png`, 2883×1453 RGBA PNG'dir. Kullanıcının gerçek kaynağıyla SHA256 aynıdır: `220184e7d689852f6afb7755f9dc2c80a7069f0a6fce4284aa269fa95aed6654`. Kaynak: `C:\Users\Kerem\Downloads\AGING IN PLACE TURKIYE\DevOps\pitch\2026-09-investor\assets\logos\yaslanmadostu-logo-source.png`. Logoyu yeniden üretme/kırpma.

## Salt okunur repo ve Vercel kanıtı

Kontrol: 2026-10-02 yaklaşık 08:27 UTC; yayın öncesi güncelliği yeniden doğrula.

| Alan | Gözlenen değer |
| --- | --- |
| Repo | `C:\Users\Kerem\Downloads\yaslanmadostu-platform` |
| Current branch | `release/yd-narrative-1` |
| Local HEAD | `3a1a7a9434c7c0719f079bf540eda13e000bf7f8` |
| origin fetch/push | `https://github.com/krm532/yaslanmadostu-platform.git` |
| Remote release branch (git ls-remote) | `3a1a7a9434c7c0719f079bf540eda13e000bf7f8` |
| Remote main (git ls-remote) | `ef9de31985cfd059b62ad6c16e3b30cb3219a2be` |
| Vercel team | `team_wOTta3tVgMCuS0gaFkOnbivs`, scope `krmabuska-6472s-projects` |
| Vercel project | `prj_KUk8GlITPtFiYqYFOJMkvO1MXXUE`, `yaslanmadostu-platform`, Next.js, Node 24.x |
| Domain lookup | Vercel get_deployment(`yaslanmadostu.com`) aşağıdaki eski production kaydını döndürdü |
| Eski production deployment | `dpl_5itemPC72QG1h3j8DtwH4fahCvXm`, target=production, READY |
| Eski production URL | `https://yaslanmadostu-platform-g2dysojx3-krmabuska-6472s-projects.vercel.app` |
| Eski production commit/ref | `ef9de31985cfd059b62ad6c16e3b30cb3219a2be`, `main` |
| Rollback adaylığı | Vercel list_deployments eski production için `isRollbackCandidate=true` döndürdü |
| Narrative preview | `dpl_Ce8CwQZMsM3eJ25ZMendokyQXcDQ`, READY, target=null, ref=`release/yd-narrative-1`, SHA=`3a1a7a9...` |
| Canlı HTTP | `https://yaslanmadostu.com/` HTTP 200, Server=Vercel, eski vitrin HTML'i; popup henüz yok |
| Yerel Vercel bağlantısı | Hazırlama anında repoda `.vercel/project.json` yok |

**Kritik kanıt sınırı:** latestDeployment narrative PREVIEW'dir; production olarak kullanma. Proje/domain ve production deployment eşleşmesi domain lookup ile gözlendi, ancak get_project domains ve eski deployment alias listesi özel domaini listelemedi. Ayrıca get_project cevabında güncel `link.productionBranch` alanı yoktu. Production deployment'ın ref'i **main** olarak doğrulandı; güncel production branch AYARI bu ref'ten çıkarılamaz.

**Yayın gate'i:** Sonnet, mevcut projenin Vercel Dashboard / yetkili salt okunur API üzerinden (1) GitHub bağlantısı krm532/yaslanmadostu-platform, (2) güncel Production Branch, (3) yaslanmadostu.com'un bu project'e bağlı verified production domain oluşu, varsa www yönlendirmesi, (4) mevcut domainin production deployment ID/SHA'sı, (5) rollback'in bu domaini kapsaması ve mevcut hesabın rollback yetkisini doğrulayıp kayıt altına almalı. Salt okunur API karşılıkları: GET /v9/projects/{projectId}, GET /v9/projects/{projectId}/domains, GET /v13/deployments/{idOrUrl} (teamId yukarıdaki scope). CLI API söz dizimini kurulu sürümün `vercel api --help` çıktısından doğrula. Cevaplardan yalnız gerekli alanları raporla; env değerlerini dökme. Domain/branch/rollback eşleşmesi belirsizse yayın mutasyonlarına geçme; eksik alanı somut engel olarak bildir. Ayarları değiştirerek veya yeni proje/domain yaratarak çözmeye çalışma.

Eski production hedefi ileride değişmişse yeni doğrulanmış mevcut production'ı rollback hedefi olarak kaydet. Hazırlama snapshot'ını körlemesine kullanma.

## Exact teslim dosyaları ve uncommitted durum

Hazırlama sonunda index boş; aşağıdakiler uncommitted. Başka kullanıcı değişiklikleri gelmişse koru. `git status --short --untracked-files=all`, `git diff`, `git diff --cached` ile tekrar kontrol et.

| Git status | Exact relative path | İşlev |
| --- | --- | --- |
| M | app/page.tsx | Popup mount; mevcut CTA hedef section id/tabIndex |
| ?? | components/InvestorIntro.tsx | Onaylı popup; her sayfa açılışında auto-open |
| ?? | components/InvestorIntro.module.css | Onaylı desktop/mobile tasarım; son davranış düzeltmesinde değiştirilmedi |
| ?? | public/images/investor-intro/medication-dispenser.webp | Onaylı ürün görseli |
| ?? | public/images/investor-intro/sleep-sensor.webp | Onaylı ürün görseli |
| ?? | public/images/investor-intro/hip-airbag.webp | Onaylı ürün görseli |
| ?? | public/images/investor-intro/daily-solutions.webp | Onaylı ürün görseli |
| ?? | public/images/investor-intro/bathroom-adaptation.webp | Onaylı hizmet görseli |
| ?? | public/images/investor-intro/sources.json | Önceki görsel kaynak/crop kayıtları |
| ?? | public/images/investor-intro/yaslanmadostu-logo.png | Gerçek değişmemiş logo |
| ?? | scripts/verify-investor-intro.cjs | Önceki browser betiği, yeni açılış beklentileri; screenshot üretmez |
| ?? | docs/SONNET_YASLANMADOSTU_POPUP_DEPLOY.md | Bu handoff |

Kod zaten yerelde. Kopya uygulama dosyaları oluşturma, eski görev çıktılarını application repo'ya topluca kopyalama. Package/lockfile değişikliği gerekmedi.

Üst dizinlerde/repo içinde AGENTS.md ve repo .agents/.codex kaynakları kontrol edildi; uygulanabilir yerel talimat bulunmadı. Sonnet kendi yürütme ortamında talimatları tekrar kontrol etmeli.

## Son doğrulama ve tekrar komutları

- Final `npm run build`: PASS, 21 sayfa; Next.js 16.2.2.
- Final `node node_modules/typescript/bin/tsc --noEmit`: PASS.
- `git diff --check`: PASS.
- Production build üzerinde izole headless Chrome, kullanıcının Windows bilgisayarı: **15/15 PASS**, runtime/console errors=[].
- Desktop 1440×900, mobile 390×844 ve 320×568: yatay taşma yok; logo oranı ve kart etiketleri doğrulandı.
- İlk açılış, eski session flag varken refresh, yeni sekme/session, kapatınca beklerken kapalı kalma, Escape, Tab/Shift+Tab, odak/scroll, backdrop, reopen, CTA, query/hash ve mevcut kategori/ürün navigasyonu geçti.
- Önceden var olan favicon.ico 404 devam ediyor; popup kapsamı dışındadır.
- Görünüm değişmediği için yeni screenshot seti oluşturulmadı.

Final JSON: `C:\Users\Kerem\Documents\Codex\2026-10-02\task-2\verification\verification.json`.
Önceki onaylı PNG'ler ve kaynak raporları: `C:\Users\Kerem\Documents\Codex\2026-10-02\task\preview\`; eski verification.json'daki session-once/bypass beklentileri tarihsel, final davranış için kullanma.
Preview **açık**: http://127.0.0.1:3124/ (yalnız loopback). Build sonrası eski server güncel asset'leri sunmadığı için yeniden başlatıldı; tüm final testler yeni production build ile geçti.

PowerShell; komutların her birinin exit code'unu kontrol et:

```powershell
Set-Location -LiteralPath 'C:\Users\Kerem\Downloads\yaslanmadostu-platform'
git status --short --untracked-files=all
git diff --check
node node_modules/typescript/bin/tsc --noEmit
npm run build
# Build'i aktif next start server'ın altında yaptıysan aynı preview'i yeni build ile restart et.
# Yeni server gerekirse ayrı terminalde; mevcut 3124'ü ikinci kez başlatma:
# npm run start -- --hostname 127.0.0.1 --port 3124
node scripts/verify-investor-intro.cjs
```

Test betiği Playwright / playwright-core modülünü veya mevcut Codex Windows runtime'ını kullanır. Başka ortam için `PLAYWRIGHT_MODULE` ve `CHROME_PATH` ile var olan kurulumu belirt; sırf bu iş için repo dependencies/lockfile değiştirme. URL `INTRO_TEST_URL`, rapor dizini `INTRO_TEST_OUTPUT` ile ayarlanabilir; varsayılan rapor temp/yaslanmadostu-popup-verification/verification.json. Preview açık kalsın; build sırasında server artifact uyumsuzluğu olursa yalnız kimliği doğrulanmış bu repo/3124 sürecini yeniden başlat.

## Sonnet'in exact stage / commit / push işlemi

Önce yukarıdaki repo/Vercel gate'ini ve final testleri geç. index'te başka staged iş varsa koru. `git add .`, `git add -A`, reset/clean/stash-all, force push veya hard reset kullanma. Yalnız bu listeyi stage/commit et:

```powershell
$popupPaths = @(
  'app/page.tsx',
  'components/InvestorIntro.tsx',
  'components/InvestorIntro.module.css',
  'public/images/investor-intro/medication-dispenser.webp',
  'public/images/investor-intro/sleep-sensor.webp',
  'public/images/investor-intro/hip-airbag.webp',
  'public/images/investor-intro/daily-solutions.webp',
  'public/images/investor-intro/bathroom-adaptation.webp',
  'public/images/investor-intro/sources.json',
  'public/images/investor-intro/yaslanmadostu-logo.png',
  'scripts/verify-investor-intro.cjs',
  'docs/SONNET_YASLANMADOSTU_POPUP_DEPLOY.md'
)
git add -- $popupPaths
git diff --cached --check -- $popupPaths
git diff --cached --stat -- $popupPaths
git diff --cached -- app/page.tsx components/InvestorIntro.tsx
git commit --only -m 'Add approved investor intro on every home page load' -- $popupPaths
$popupSha = (git rev-parse HEAD).Trim()
$deliveryBranch = (git branch --show-current).Trim()
git show --format=fuller --stat $popupSha
git status --short --untracked-files=all
```

Hazırlanan HEAD/branch/remote değişmişse önce farkı değerlendir; kullanıcı işini overwrite etme. Dosya listesindeki ek değişikliklerin aynı popup işi olduğu doğrulanmadan commit etme. Git operasyonları remote'a bir şey yazmadan önce current origin branch SHA'sını kontrol et.

Gate'te Production Branch `main` çıkarsa mevcut `release/yd-narrative-1` non-production delivery dalıdır. Bu durumda:
```powershell
git push origin HEAD:refs/heads/release/yd-narrative-1
git ls-remote --heads origin release/yd-narrative-1
```
Remote SHA `$popupSha` ile aynı olmalı. Production branch farklıysa bu refspec'i körlemesine uygulama: current branch production ise ayrı, çakışmayan bir teslim dalı oluştur ve yalnız o dalı push et; push production deploy'u tetiklemeden aşağıdaki kontrollü yayın yolunu kullan. Production branch ayarını değiştirme; bu teslim için main merge'i zorunlu değildir. Daha sonra main'e merge yapılacaksa eski narrative baseline'ın da fark içerdiğini açıkça incele; yetkisiz ek iş veya çatışmayı çözmek için kullanıcı değişikliklerini atma.

## Mevcut projede kontrollü production yayın

Git push non-production preview oluşturabilir; preview READY olması canlı domainin güncellendiği anlamına gelmez. Tercih edilen yol exact commit'ten temiz checkout, production ortamıyla domain atamadan deploy, smoke, ardından mevcut domainleri promotion ile taşıma. CLI bu hazırlama ortamında PATH'te bulunmadı; Sonnet yetkili ortamındaki mevcut Vercel CLI ve oturumu kullanmalı, gerekirse CLI'ı repo dependency'lerini değiştirmeden hazırlamalı.

```powershell
# $popupSha exact committed SHA, $deliveryBranch exact pushed branch olmalı.
$popupDeployDir = Join-Path $env:TEMP ('yaslanmadostu-popup-' + $popupSha.Substring(0,12))
if (Test-Path -LiteralPath $popupDeployDir) { throw 'Deploy checkout already exists; inspect before reuse' }
git worktree add --detach $popupDeployDir $popupSha
Set-Location -LiteralPath $popupDeployDir
# Temiz commit checkout'u; unrelated yerel dosyalar upload edilmez.
npm ci
vercel whoami
# Yalnız varlığı ve kimliği gate'te doğrulanmış mevcut project'e LOCAL link.
vercel link --yes --project prj_KUk8GlITPtFiYqYFOJMkvO1MXXUE --scope krmabuska-6472s-projects
Get-Content .vercel/project.json
# projectId ve orgId tabloda verilenlerle birebir eşleşmezse DUR.
# Production env'yi sadece yerelde kullan; değerleri çıktıya dökme veya commit etme.
vercel pull --yes --environment=production --scope krmabuska-6472s-projects
vercel build --prod --scope krmabuska-6472s-projects
vercel deploy --prebuilt --prod --skip-domain --scope krmabuska-6472s-projects --meta githubCommitSha=$popupSha --meta githubCommitRef=$deliveryBranch
```

Komutun döndürdüğü gerçek deployment ID/URL'yi kaydet. Aynı proje/team, target=production, READY ve Git SHA=`$popupSha` olduğunu inspect / yetkili deployment kaydıyla doğrula; metadata eklemek tek başına kod kanıtı değildir, bu yüzden upload exact temiz SHA checkout'undan yapılır.

Deployment URL üzerinde popup browser smoke'u çalıştır. Preview/production URL deployment protection'a takılırsa mevcut yetkili oturum/izinli bypass kullan; security/protection ayarlarını kapatma, bypass değerini raporlama veya commit etme. Bu ortamda script'in `INTRO_TEST_URL` değişkeniyle çalışması mümkündür; korumalı URL için mevcut authenticated browser da kullanılabilir.

Domain/production branch/rollback gate'i hâlâ geçerliyse:
```powershell
# $popupDeploymentId, yukarıdaki komutun döndürdüğü gerçek ID; placeholder değil.
vercel promote $popupDeploymentId --scope krmabuska-6472s-projects
vercel inspect $popupDeploymentId --scope krmabuska-6472s-projects
```

Bu promotion mevcut production domainlerini aynı project'te yeni artifact'e taşır. Yeni domain veya alias yaratma. Yayın öncesi gate'in mevcut özel domaini promotion kapsamına dahil olduğunu kanıtlaması gerekir; aksi durumda dur.

Canlı https://yaslanmadostu.com/ üzerinde yeni izole session ve mevcut session flag ile refresh, yeni sekme, kapatma/Escape/reopen/CTA/focus, 1440/390/320 px smoke; resim/font/JS yüklenmesi, yatay taşma ve konsol/runtime hatalarını kontrol et. Popup kapanınca eski vitrin arka planı ve kategori/ürün navigasyonu görünür/çalışır olmalı. Domain lookup'un aynı project'teki yeni ID/SHA'ya çözüldüğünü tekrar doğrula.

**Tamamlanma ölçütü:** yeni production SHA + READY + gerçek domainin yeni deployment'a bağlı olması + canlı browser smoke PASS. Yalnız build/READY veya yalnız HTTP 200 yeterli değil. Kullanıcıya canonical URL, tam commit SHA, production deployment ID/URL, test sonucu ve rollback hedefini bildir.

## Doğrulanmış rollback hedefi ve prosedürü

Hazırlama sırasında READY production ve `isRollbackCandidate=true` olarak doğrulanan eski hedef:
`dpl_5itemPC72QG1h3j8DtwH4fahCvXm`, SHA `ef9de31985cfd059b62ad6c16e3b30cb3219a2be`, ref main. Narrative preview `dpl_Ce8...` rollback production hedefi değildir.

Canlı smoke başarısızsa, yayın öncesi kaydettiğin hâlâ doğru olan eski production'a aynı scope'ta geri dön:
```powershell
# Hazırlama snapshot'ı değişmediyse exact komut:
vercel rollback dpl_5itemPC72QG1h3j8DtwH4fahCvXm --scope krmabuska-6472s-projects
vercel rollback status yaslanmadostu-platform --scope krmabuska-6472s-projects
```
Snapshot değişmişse exact güncel eski ID'yi kullan. CLI erişimi yoksa aynı Vercel project Production Deployment > Instant Rollback; domain listesi yaslanmadostu.com'u kapsamalı. Rollback'in gerçekten READY eski SHA'yı canlı domain üzerinden sunduğunu HTTP ve browser ile doğrula. Hobby'de yalnız hemen önceki production hedefinin geri alınabildiğini dikkate al; yeni promotion'dan önce aday/yetki/domain kapsamını yeniden doğrula. Bu hazırlamada rollback çalıştırılmadı; hedef uygunluğu ve resmi prosedür salt okunur doğrulandı.

Rollback production domain auto-assignment'ını kapatır; bunu gizlice ayar değiştirerek açma. Sonraki düzeltme yayını explicit `vercel promote <verified-new-id>` ile normal davranışı geri getirir. Git rollback gerekirse yalnız bu popup commit'ini ayrı revert commit'iyle geri al; hard reset/force push yapma.

Resmi komut dayanakları: [Production deploy ve skip-domain](https://vercel.com/docs/cli/deploy), [Promote](https://vercel.com/docs/cli/promote), [Rollback](https://vercel.com/docs/cli/rollback), [Instant Rollback kapsamı](https://vercel.com/docs/instant-rollback), [Exact mevcut project'e link](https://vercel.com/docs/cli/link). Komut söz dizimini çalıştırılan CLI sürümüyle de kontrol et.

## Kullanıcının Sonnet'e vereceği kısa başlangıç promptu

> C:\Users\Kerem\Downloads\yaslanmadostu-platform\docs\SONNET_YASLANMADOSTU_POPUP_DEPLOY.md dosyasını tamamen oku ve uygula. Onaylı kod zaten yerelde; tasarımı/metinleri değiştirme. Belgedeki repo, mevcut Vercel proje/domain, production branch ve rollback kontrollerini geçtikten sonra yalnız exact teslim dosyalarını commit/push et ve mevcut yaslanmadostu.com sitesinin yerine yayınla. Production SHA + READY ve canlı popup smoke testiyle sonucu doğrula; belirsiz eşleşme varsa durup exact engeli bildir.
