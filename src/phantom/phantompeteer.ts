import * as puppeteer from 'puppeteer';
import { SetupPhantomOption } from './constants/SetupPhantomOption';

import downloader from './downloader';
import getPhantomExtensionPage from './instruction/GetePhantomExtensionPage';
import importAccount from './instruction/ImportAccount';

export async function launch(puppeteerLib: typeof puppeteer): Promise<puppeteer.Browser> {
  const PHANTOM_PATH = await downloader();

  return puppeteerLib.launch({
    headless: false,
    args: [`--disable-extensions-except=${PHANTOM_PATH}`, `--load-extension=${PHANTOM_PATH}`],
    // ...rest,
  });
}

export async function setupPhantom(browser: puppeteer.Browser, options: SetupPhantomOption): Promise<void> {
  const phantomPage = await getPhantomExtensionPage(browser);
  await importAccount(phantomPage, options.seed, options.password);
}
