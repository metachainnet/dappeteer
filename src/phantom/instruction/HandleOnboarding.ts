import * as puppeteer from 'puppeteer';

import executePageTemplate from './ExecutePageTemplate';

const handleOnboarding = (browser: puppeteer.Browser, callback: (page: puppeteer.Page) => void): Promise<void> =>
  executePageTemplate(browser, 'chrome-extension://[a-z]+/onboarding.html', callback);

export default handleOnboarding;
