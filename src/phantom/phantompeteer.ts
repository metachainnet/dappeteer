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
