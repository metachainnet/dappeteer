import * as puppeteer from 'puppeteer';

import executePageTemplate from './ExecutePageTemplate';

const handleOnboarding = (browser: puppeteer.Browser, callback: (page: puppeteer.Page) => Promise<void>): void =>
  executePageTemplate(browser, 'chrome-extension://[a-z]+/onboarding.html', callback);

export default handleOnboarding;
