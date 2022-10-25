import * as puppeteer from 'puppeteer';

import { SetupPhantomOption } from './constants/SetupPhantomOption';
import downloader from './downloader';
import handleOnboarding from './instruction/HandleOnboarding';
import importAccount from './instruction/ImportAccount';

export async function launch(puppeteerLib: typeof puppeteer): Promise<puppeteer.Browser> {
  const PHANTOM_PATH = await downloader();

  return puppeteerLib.launch({
    headless: false,
    args: [`--disable-extensions-except=${PHANTOM_PATH}`, `--load-extension=${PHANTOM_PATH}`],
  });
}

export function setupPhantom(browser: puppeteer.Browser, options: SetupPhantomOption): void {
  handleOnboarding(browser, async (page: puppeteer.Page) => {
    importAccount(page, options.seed, options.password);
  });
}

export async function getPhantomPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
  const pages = await browser.pages();
  console.log(pages.map((p) => p.url()));
  const extensionPage = pages.find((page) => page.url().includes('chrome-extension'));
  return extensionPage;
}
