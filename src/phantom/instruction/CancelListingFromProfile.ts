import pupeteer from 'puppeteer';

import handleNotificationPage from './HandleNotification';

export interface CancelListingParam {
  browser: pupeteer.Browser;
  page: pupeteer.Page;
}

const cancelListingFromProfile = async (param: CancelListingParam): Promise<void> => {
  const { browser, page } = param;
  await page.waitForTimeout(4000);
  const url = `https://opensea.io/account?tab=listings`;
  await page.goto(url);
  while (true) {
    await page.waitForTimeout(6000);
    const cancleBtn = await page.waitForSelector('li[role="row"] button');
    if (cancleBtn) {
      await cancleBtn.click();
      handleNotificationPage(browser, async (page) => {
        const connectBtn = await page.waitForSelector('button.sc-bqiRlB.hLGcmi.sc-hBUSln.dhBqSt');
        await connectBtn.click();
      });
      await page.waitForTimeout(10000);
      await page.reload();
    } else {
      break;
    }
  }
};

export default cancelListingFromProfile;
