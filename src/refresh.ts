import puppeteer from 'puppeteer';

(async function main(): Promise<void> {
  const addresses = (await import('../mint-addresses.json')).default;
  const webLinks = addresses.map((address) => `https://opensea.io/assets/solana/${address}`);

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  for (let i = 1083; i < webLinks.length; i++) {
    console.log(webLinks[i], i);
    await page.goto(webLinks[i]);
    const btns = await page.waitForSelector('.sc-29427738-0.sc-ebeca040-0.nFISH.jKSSoM.sc-2d0c8760-0.gLySaF');
    await btns.click();
  }
})();
