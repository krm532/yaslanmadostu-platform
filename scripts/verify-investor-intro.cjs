const { chromium } = (() => {
  if (process.env.PLAYWRIGHT_MODULE) return require(process.env.PLAYWRIGHT_MODULE);
  try { return require('playwright'); } catch {}
  try { return require('playwright-core'); } catch {}
  return require('C:/Users/Kerem/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');
})();
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const output = process.env.INTRO_TEST_OUTPUT || path.join(os.tmpdir(), 'yaslanmadostu-popup-verification');
fs.mkdirSync(output, { recursive: true });
const baseUrl = (process.env.INTRO_TEST_URL || 'http://127.0.0.1:3124').replace(/\/$/, '');
const results = [];
const errors = [];
const legacyIssues = [];
async function checkCardLabels(page) {
  const logo = page.locator('dialog').getByAltText('Yaşlanma Dostu — Değişen İhtiyaçlara Uygun Çözümler', { exact: true });
  assert.equal(await logo.count(), 1);
  assert.equal(await logo.evaluate(element => Math.abs(element.width / element.height - 2883 / 1453) < 0.02), true, 'Original logo aspect ratio preserved');
  const titles = ['Uyku Takip ve Düşme Uyarı Sistemleri', 'Hızlı Risk Azaltma Çözümleri'];
  for (const title of titles) {
    const image = page.locator('dialog').getByAltText(title, { exact: true });
    assert.equal(await image.count(), 1);
    const figure = image.locator('..');
    const caption = figure.locator('figcaption');
    assert.equal(await caption.textContent(), title);
    const fits = await caption.evaluate(element => {
      const card = element.parentElement.getBoundingClientRect();
      const label = element.getBoundingClientRect();
      return element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight && label.left >= card.left && label.right <= card.right && label.top >= card.top && label.bottom <= card.bottom;
    });
    assert.equal(fits, true, title + ' fits its card');
  }
}
async function test(name, fn) {
  try { await fn(); results.push({ name, status: 'PASS' }); }
  catch (error) { results.push({ name, status: 'FAIL', error: error.message }); throw error; }
}
(async () => {
  const localChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const executablePath = process.env.CHROME_PATH || (fs.existsSync(localChrome) ? localChrome : undefined);
  const browser = await chromium.launch({ executablePath, headless: true });
  const newContext = async (options = {}) => {
    const context = await browser.newContext(options);
    context.on('page', page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => {
        if (message.type() !== 'error') return;
        if (message.location().url.endsWith('/favicon.ico')) legacyIssues.push('Existing favicon.ico returns 404');
        else errors.push(message.text());
      });
    });
    return context;
  };
  try {
    const context = await newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const dialog = page.locator('#investor-intro');
    const close = page.getByRole('button', { name: 'Tanıtımı kapat' });
    // The popup has no reopen control; a fresh page load is the only way it opens again.
    const reopenByReload = async (target = page) => { await target.reload(); await target.locator('#investor-intro').waitFor({ state: 'visible' }); };
    await test('First visit opens once, images load, page scroll locks', async () => {
      const response = await page.goto(baseUrl + '/');
      assert.equal(response.status(), 200);
      await dialog.waitFor({ state: 'visible' });
      await page.waitForFunction(() => Array.from(document.querySelectorAll('dialog img')).every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
      assert.equal(await close.evaluate(element => element === document.activeElement), true);
      assert.equal(await page.locator('[data-nextjs-dialog]').count(), 0);
      assert.equal(await dialog.evaluate(element => element.open && element.matches(':modal')), true, 'Popup is open as a modal on first visit');
      assert.equal(await page.getByRole('button', { name: 'Ticaret vizyonu' }).count(), 0, 'No reopen button exists');
      assert.equal(await page.locator('#investor-intro-title').textContent(), 'İlk Günden İyileştirmelere Başlayın.');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.equal(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth), true);
      await checkCardLabels(page);
    });
    await test('Popup is already open at first paint when scripts are slow or blocked', async () => {
      const blocked = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      await blocked.route(/\.js(\?.*)?$/, route => route.abort());
      const blockedPage = await blocked.newPage();
      await blockedPage.goto(baseUrl + '/', { waitUntil: 'domcontentloaded' });
      const blockedDialog = blockedPage.locator('#investor-intro');
      await blockedDialog.waitFor({ state: 'visible' });
      const box = await blockedDialog.boundingBox();
      assert.ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= 1440 && box.y + box.height <= 900, 'Pre-script popup fits the viewport');
      assert.ok(Math.abs(box.x + box.width / 2 - 720) < 2 && Math.abs(box.y + box.height / 2 - 450) < 2, 'Pre-script popup is centered');
      assert.equal(await blockedPage.getByRole('heading', { name: 'İlk Günden İyileştirmelere Başlayın.' }).isVisible(), true);
      await blocked.close();
      const noScript = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
      const noScriptPage = await noScript.newPage();
      await noScriptPage.goto(baseUrl + '/');
      assert.equal(await noScriptPage.locator('#investor-intro').isVisible(), false, 'Without scripting the popup is hidden so it cannot trap the visitor');
      assert.equal(await noScriptPage.getByRole('heading', { level: 1 }).textContent(), 'Çok yakında burada.İhtiyaçtan çözüme tek adres.');
      await noScript.close();
    });
    await test('Native dialog keeps keyboard focus inside in both directions', async () => {
      await page.keyboard.press('Shift+Tab');
      assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true);
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('Tab');
        assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true);
      }
    });
    await test('Escape closes and restores scroll; a reload opens it again', async () => {
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      // The native close event (scroll restore) is dispatched asynchronously after the dialog hides.
      await page.waitForFunction(() => document.body.style.overflow === '', null, { timeout: 3000 });
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      await reopenByReload();
    });
    await test('Close button and backdrop dismiss', async () => {
      await close.click();
      await dialog.waitFor({ state: 'hidden' });
      await reopenByReload();
      await page.mouse.click(10, 10);
      await dialog.waitFor({ state: 'hidden' });
    });
    await test('Reload opens even with the old session flag; dismissal stays closed', async () => {
      await page.evaluate(() => sessionStorage.setItem('yaslanmadostu:intro:v1', 'shown'));
      await page.reload();
      await dialog.waitFor({ state: 'visible' });
      assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
      await close.click();
      await page.waitForTimeout(1100);
      assert.equal(await dialog.evaluate(element => element.open), false);
    });
    await test('New tab and new browser session open directly', async () => {
      const tab = await context.newPage();
      await tab.goto(baseUrl + '/');
      await tab.locator('#investor-intro').waitFor({ state: 'visible' });
      await tab.close();
      const fresh = await newContext();
      const freshPage = await fresh.newPage();
      await freshPage.goto(baseUrl + '/');
      await freshPage.locator('#investor-intro').waitFor({ state: 'visible' });
      await fresh.close();
    });
    await test('Explore closes and moves focus to existing solution groups', async () => {
      await reopenByReload();
      await page.getByRole('button', { name: 'Çözüm gruplarını keşfet' }).click();
      await dialog.waitFor({ state: 'hidden' });
      await page.waitForFunction(() => document.activeElement.id === 'cozum-seckisi');
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    });
    await test('Existing category and product navigation still works', async () => {
      await page.goto(baseUrl + '/kategori/banyo-guvenligi');
      assert.equal(await page.locator('#investor-intro').count(), 0);
      const productResponse = await page.goto(baseUrl + '/urun/non-slip-bath-mat');
      assert.equal(productResponse.status(), 200);
      assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Kaymaz Banyo Paspası');
    });
    await test('Assessment referral also opens; coming-soon page remains behind it', async () => {
      await page.goto(baseUrl + '/?source=gumusev');
      await dialog.waitFor({ state: 'visible' });
      await close.click();
      assert.equal(await page.locator('#cozum-seckisi').count(), 1);
      await reopenByReload();
      await dialog.waitFor({ state: 'visible' });
      await close.click();
    });
    const assertComingSoon = async target => {
      // textContent ignores text-transform (the eyebrow is rendered uppercase); the dialog is excluded.
      const body = await target.evaluate(() => { const copy = document.body.cloneNode(true); copy.querySelectorAll('dialog, script, style').forEach(node => node.remove()); return copy.textContent; });
      for (const text of ['Çok yakında burada.', 'İhtiyaçtan çözüme tek adres.', 'GümüşEV ekosisteminin çözüm vitrini', 'Hazırlanan çözüm grupları', 'Satış henüz başlamadı. Ürünler ve hizmetler hazır olduğunda bu sayfa açılacak.', 'Bu arada evinizi GümüşEV ile tarayın', 'Üründen yerinde uygulamaya', 'Aydınlatma, banyo ve erişilebilir dönüşüm']) {
        assert.ok(body.includes(text), 'Coming-soon text present: ' + text);
      }
      for (const text of ['Temsili Vitrin', 'İlk çözüm seçkimizle başlayın', 'Banyo Güvenliği', 'Bu site nedir', 'Bağlantılı Cihazlar', 'Önce evinizi değerlendirin']) {
        assert.ok(!body.includes(text), 'Old storefront text absent: ' + text);
      }
      assert.equal(await target.locator('a[href^="/kategori"], a[href^="/urun"], a[href^="/hakkinda"], header, footer').count(), 0, 'No old storefront links, header or footer on home');
      assert.ok(!body.includes('Ticaret vizyonu'), 'Reopen button text absent');
      assert.equal(await target.getByRole('heading', { level: 1 }).count(), 1, 'Single h1');
      assert.equal(await target.getByRole('link', { name: 'Bu arada evinizi GümüşEV ile tarayın' }).getAttribute('href'), 'https://www.gumusev.org/tr');
      assert.equal(await target.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'No horizontal overflow');
      assert.equal(await target.evaluate(() => Array.from(document.querySelectorAll('[aria-hidden="true"] img')).every(image => image.alt === '' && image.complete && image.naturalWidth > 0)), true, 'Decorative backdrop images load with empty alt');
    };
    await test('Every close path shows the coming-soon page without the old storefront', async () => {
      await page.goto(baseUrl + '/');
      await dialog.waitFor({ state: 'visible' });
      await close.click();
      await dialog.waitFor({ state: 'hidden' });
      await assertComingSoon(page);
      await reopenByReload();
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      await reopenByReload();
      await page.mouse.click(10, 10);
      await dialog.waitFor({ state: 'hidden' });
      await reopenByReload();
      await page.getByRole('button', { name: 'Kapat', exact: true }).click();
      await dialog.waitFor({ state: 'hidden' });
      await assertComingSoon(page);
      await reopenByReload();
      await dialog.waitFor({ state: 'visible' });
      await close.click();
    });
    await test('Explore lands focus on the prepared solution groups section', async () => {
      await reopenByReload();
      await page.getByRole('button', { name: 'Çözüm gruplarını keşfet' }).click();
      await dialog.waitFor({ state: 'hidden' });
      await page.waitForFunction(() => document.activeElement.id === 'cozum-seckisi');
      assert.equal(await page.locator('#cozum-seckisi h2').textContent(), 'Hazırlanan çözüm grupları');
      assert.equal(await page.locator('#cozum-seckisi').isVisible(), true);
    });
    await test('Category and product pages keep their content, header and footer, without the popup', async () => {
      const referral = await page.goto(baseUrl + '/urun/non-slip-bath-mat?source=gumusev');
      assert.equal(referral.status(), 200);
      assert.equal(await page.locator('#investor-intro').count(), 0);
      assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Kaymaz Banyo Paspası');
      assert.equal(await page.locator('header').count(), 1);
      assert.equal(await page.locator('footer').count(), 1);
      const category = await page.goto(baseUrl + '/kategori/banyo-guvenligi');
      assert.equal(category.status(), 200);
      assert.equal(await page.locator('#investor-intro').count(), 0);
      assert.equal(await page.locator('header nav a[href="/hakkinda"]').count(), 1);
    });
    await test('Home at 1440, 390 and 320 has no overflow with the popup closed', async () => {
      for (const [width, height] of [[1440, 900], [390, 844], [320, 568]]) {
        const sizePage = await (await newContext({ viewport: { width, height } })).newPage();
        await sizePage.goto(baseUrl + '/');
        await sizePage.locator('#investor-intro').waitFor({ state: 'visible' });
        await sizePage.getByRole('button', { name: 'Tanıtımı kapat' }).click();
        await sizePage.locator('#investor-intro').waitFor({ state: 'hidden' });
        await assertComingSoon(sizePage);
        if (width === 320) assert.equal(await sizePage.evaluate(() => { const tops = Array.from(document.querySelectorAll('#cozum-seckisi li')).map(item => Math.round(item.getBoundingClientRect().top)); return new Set(tops).size === tops.length; }), true, 'Cards stack at 320');
        await sizePage.context().close();
      }
    });
    await test('Reduced motion removes every animation on the coming-soon page', async () => {
      const calm = await newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      const calmPage = await calm.newPage();
      await calmPage.goto(baseUrl + '/');
      await calmPage.locator('#investor-intro').waitFor({ state: 'visible' });
      await calmPage.getByRole('button', { name: 'Tanıtımı kapat' }).click();
      await calmPage.locator('#investor-intro').waitFor({ state: 'hidden' });
      assert.equal(await calmPage.evaluate(() => Array.from(document.querySelectorAll('main *, main *::after, main *::before')).filter(element => !element.closest('dialog')).every(element => getComputedStyle(element).animationName === 'none')), true);
      assert.equal(await calmPage.evaluate(() => Array.from(document.querySelectorAll('#cozum-seckisi li')).every(element => getComputedStyle(element).opacity === '1')), true);
      await calm.close();
    });
    await test('Full page section-link load also opens directly', async () => {
      await page.goto(baseUrl + '/#cozum-seckisi');
      await dialog.waitFor({ state: 'visible' });
      await close.click();
    });
    const mobile = await newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const mobilePage = await mobile.newPage();
    await test('390px mobile opens, images load, no horizontal overflow', async () => {
      await mobilePage.goto(baseUrl + '/');
      await mobilePage.locator('#investor-intro').waitFor({ state: 'visible' });
      await mobilePage.waitForFunction(() => Array.from(document.querySelectorAll('dialog img')).every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.scrollWidth <= element.clientWidth), true);
      assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await checkCardLabels(mobilePage);
    });
    await test('Mobile scroll reaches journey while close control stays available', async () => {
      await mobilePage.locator('dialog').evaluate(element => element.scrollTop = element.scrollHeight);
      const closeBounds = await mobilePage.getByRole('button', { name: 'Tanıtımı kapat' }).boundingBox();
      assert.ok(closeBounds.y >= 0 && closeBounds.y + closeBounds.height <= 844);
      await mobilePage.getByRole('button', { name: 'Tanıtımı kapat' }).click();
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.open), false);
    });
    await test('320px short mobile remains usable without horizontal overflow', async () => {
      await mobilePage.setViewportSize({ width: 320, height: 568 });
      await reopenByReload(mobilePage);
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.scrollTop), 0);
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.scrollWidth <= element.clientWidth), true);
      assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await checkCardLabels(mobilePage);
      await mobilePage.locator('dialog').evaluate(element => element.scrollTop = element.scrollHeight);
      await mobilePage.getByRole('button', { name: 'Kapat', exact: true }).click();
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.open), false);
    });
    await test('Restricted storage does not break intro', async () => {
      const restricted = await newContext({ viewport: { width: 1280, height: 800 } });
      await restricted.addInitScript(() => { Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('Storage unavailable'); } }); });
      const restrictedPage = await restricted.newPage();
      await restrictedPage.goto(baseUrl + '/');
      await restrictedPage.locator('dialog').waitFor({ state: 'visible' });
      await restrictedPage.getByRole('button', { name: 'Tanıtımı kapat' }).click();
      assert.equal(await restrictedPage.locator('dialog').evaluate(element => element.open), false);
      await restricted.close();
    });
    await test('No browser runtime or console errors', async () => assert.deepEqual(errors, []));
  } finally {
    fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify({ timestamp: new Date().toISOString(), baseUrl, browser: 'Isolated headless Chrome on user Windows computer (or configured browser)', results, errors, legacyIssues }, null, 2));
    await browser.close();
    console.log(JSON.stringify({ results, errors, legacyIssues }, null, 2));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
