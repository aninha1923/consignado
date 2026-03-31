const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://blog.agibank.com.br/');
  
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'initial_state.png' });
  
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a.btn, a.button')).map(el => ({
        text: el.innerText,
        visible: el.offsetHeight > 0
    }));
  });
  console.log('Visible buttons/links:', buttons.filter(b => b.visible));
  
  await browser.close();
})();
