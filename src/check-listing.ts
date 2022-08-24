import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import checkListing from './phantom/instruction/CheckListing';

(async function main(): Promise<void> {
  const addresses = (await import('../mint-addresses.json')).default;

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  const listing: string[] = [];

  for (let i = 0; i < addresses.length; i++) {
    try {
      const key = addresses[i];
      const result = await checkListing({ key, page });

      if (result) {
        // eslint-disable-next-line no-console
        console.log(`Listing!!! ===> ${key}`);
        listing.push(result);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Not Listing!!! ===> ${key}`);
      }
    } catch (e) {
      // not to do
    } finally {
      fs.writeFileSync(path.resolve(__dirname, 'listing.json'), JSON.stringify(listing));
    }
  }
})();
