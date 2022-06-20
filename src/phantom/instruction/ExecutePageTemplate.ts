import * as puppeteer from 'puppeteer';

const executePageTemplate = async (
  browser: puppeteer.Browser,
  url: string,
  callback?: (page: puppeteer.Page) => void,
): Promise<void> => {
  const handlePageCallback = async (target: puppeteer.Target): Promise<void> => {
    if (target.url().match(url)) {
      const page = await target.page();

      if (callback) {
        callback(page);
      }

      browser.off('targetcreated', handlePageCallback);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`HandlePageCallback: Page not found ===> ${url}`);
    }
  };

  browser.on('targetcreated', handlePageCallback);
};

export default executePageTemplate;
