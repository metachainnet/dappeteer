import puppeteer from 'puppeteer';

import * as dappeteer from './phantom/phantompeteer';

async function main(): Promise<undefined> {
  const browser = await dappeteer.launch(puppeteer);

  await dappeteer.setupPhantom(browser, {
    seed: '',
    password: '',
  });
  return;
}

main();
