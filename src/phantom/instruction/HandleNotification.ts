import * as puppeteer from 'puppeteer';

import executePageTemplate from './ExecutePageTemplate';

const handleNotificationPage = (browser: puppeteer.Browser, callback: (page: puppeteer.Page) => void): Promise<void> =>
  executePageTemplate(browser, 'chrome-extension://[a-z]+/notification.html', callback);

export default handleNotificationPage;
