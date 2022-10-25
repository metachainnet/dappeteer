import * as puppeteer from 'puppeteer';

const executePageTemplate = (
  browser: puppeteer.Browser,
  url: string,
  callback?: (page: puppeteer.Page) => Promise<void>,
): void => {
  const handlePageCallback = async (target: puppeteer.Target): Promise<void> => {
    if (target.url().match(url)) {
      const page = await target.page();

      if (callback) {
        await callback(page);
      }
      browser.off('targetcreated', handlePageCallback);
    } else {
      // eslint-disable-next-line no-console
      // console.warn(`HandlePageCallback: Page not found ===> ${url}, ${target.url()}`);
    }
  };

  browser.on('targetcreated', handlePageCallback);
};

export default executePageTemplate;
