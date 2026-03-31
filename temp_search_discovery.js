const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://blog.agibank.com.br/');
  
  const searchButton = 'a.slide-search.astra-search-icon';
  const menuBusca = '.ast-search-menu-icon.slide-search';
  const searchInput = 'input[type="search"]';
  
  console.log('Initial state:');
  console.log(`Menu class: ${await page.locator(menuBusca).getAttribute('class')}`);
  
  console.log('Clicking button...');
  await page.locator(searchButton).click();
  await page.waitForTimeout(1000);
  
  console.log(`After click, menu class: ${await page.locator(menuBusca).getAttribute('class')}`);
  console.log(`Input visible: ${await page.locator(searchInput).isVisible()}`);
  
  if (!(await page.locator(searchInput).isVisible())) {
     console.log('Trying evaluate click...');
     await page.locator(searchButton).evaluate(el => el.click());
     await page.waitForTimeout(1000);
     console.log(`After evaluate click, menu class: ${await page.locator(menuBusca).getAttribute('class')}`);
     console.log(`Input visible: ${await page.locator(searchInput).isVisible()}`);
  }
  
  await browser.close();
})();
