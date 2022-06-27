import puppeteer from 'puppeteer';

(async function main(): Promise<void> {
  const addresses = (await import('../mint-addresses.json')).default;
  const webLinks = addresses.map((address) => `https://opensea.io/assets/solana/${address}`);

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  for (let i = 0; i < webLinks.length; i++) {
    await page.goto(webLinks[i]);
    const btns = await page.waitForSelector('.fPnOUC');
    await btns.click();
  }
})();
