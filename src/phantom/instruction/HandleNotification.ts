import * as puppeteer from 'puppeteer';

import executePageTemplate from './ExecutePageTemplate';

const handleNotificationPage = (browser: puppeteer.Browser, callback: (page: puppeteer.Page) => Promise<void>): void =>
  executePageTemplate(browser, 'chrome-extension://[a-z]+/notification.html', callback);

export default handleNotificationPage;
