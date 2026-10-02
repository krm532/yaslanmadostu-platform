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
  const logo = page.getByAltText('Yaşlanma Dostu — Değişen İhtiyaçlara Uygun Çözümler', { exact: true });
  assert.equal(await logo.count(), 1);
  assert.equal(await logo.evaluate(element => Math.abs(element.width / element.height - 2883 / 1453) < 0.02), true, 'Original logo aspect ratio preserved');
  const titles = ['Uyku Takip ve Düşme Uyarı Sistemleri', 'Hızlı Risk Azaltma Çözümleri'];
  for (const title of titles) {
    const image = page.getByAltText(title, { exact: true });
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
    const reopen = page.getByRole('button', { name: 'Ticaret vizyonu' });
    await test('First visit opens once, images load, page scroll locks', async () => {
      const response = await page.goto(baseUrl + '/');
      assert.equal(response.status(), 200);
      await dialog.waitFor({ state: 'visible' });
      await page.waitForFunction(() => Array.from(document.querySelectorAll('dialog img')).every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
      assert.equal(await close.evaluate(element => element === document.activeElement), true);
      assert.equal(await page.locator('[data-nextjs-dialog]').count(), 0);
      assert.equal(await page.locator('#investor-intro-title').textContent(), 'İlk Günden İyileştirmelere Başlayın.');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.equal(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth), true);
      await checkCardLabels(page);
    });
    await test('Native dialog keeps keyboard focus inside in both directions', async () => {
      await page.keyboard.press('Shift+Tab');
      assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true);
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('Tab');
        assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true);
      }
    });
    await test('Escape closes, restores scroll and focus, reopen works', async () => {
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      // The native close event (scroll/focus restore) is dispatched asynchronously after the dialog hides.
      await page.waitForFunction(() => document.body.style.overflow === '' && document.activeElement && document.activeElement.textContent.includes('Ticaret vizyonu'), null, { timeout: 3000 });
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      assert.equal(await reopen.evaluate(element => element === document.activeElement), true);
      await reopen.click();
      await dialog.waitFor({ state: 'visible' });
    });
    await test('Close button and backdrop dismiss', async () => {
      await close.click();
      await dialog.waitFor({ state: 'hidden' });
      await reopen.click();
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
      await reopen.click();
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
    await test('Assessment referral also opens; existing referral content remains', async () => {
      await page.goto(baseUrl + '/?source=gumusev');
      await dialog.waitFor({ state: 'visible' });
      await close.click();
      assert.equal(await page.locator('#cozum-seckisi').count(), 1);
      await reopen.click();
      await dialog.waitFor({ state: 'visible' });
      await close.click();
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
      await mobilePage.getByRole('button', { name: 'Ticaret vizyonu' }).click();
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.scrollTop), 0);
      assert.equal(await mobilePage.locator('dialog').evaluate(element => element.scrollWidth <= element.clientWidth), true);
      assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await checkCardLabels(mobilePage);
      await mobilePage.locator('dialog').evaluate(element => element.scrollTop = element.scrollHeight);
      await mobilePage.getByRole('button', { name: 'Siteyi incele' }).click();
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
