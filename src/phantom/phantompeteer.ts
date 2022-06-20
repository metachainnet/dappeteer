import * as puppeteer from 'puppeteer';

import downloader from './downloader';

export async function launch(puppeteerLib: typeof puppeteer): Promise<puppeteer.Browser> {
  const PHANTOM_PATH = await downloader();

  return puppeteerLib.launch({
    headless: false,
    args: [`--disable-extensions-except=${PHANTOM_PATH}`, `--load-extension=${PHANTOM_PATH}`],
    // ...rest,
  });
}

// export async function setupPhantom(browser: puppeteer.Browser): Promise<Dappeteer> {
//   const page = await closeHomeScreen(browser);
//   await confirmWelcomeScreen(page);
// }
