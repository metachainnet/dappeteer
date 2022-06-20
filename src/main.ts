import puppeteer from 'puppeteer';

import * as dappeteer from './phantom/phantompeteer';

async function main(): Promise<undefined> {
  const browser = await dappeteer.launch(puppeteer);

  const page = await browser.newPage();
  await page.goto('http://opensea.io');

  return;
}

main();
