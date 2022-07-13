import pupeteer from 'puppeteer';

import handleNotificationPage from './HandleNotification';

export interface CancelListingParam {
  browser: pupeteer.Browser;
  key: string;
  price: number;
  first: boolean;
}

const cancelListing = async (param: CancelListingParam): Promise<void> => {
  const { browser, key, price, first } = param;
  const sellingPage = await browser.newPage();
  const url = `https://opensea.io/assets/solana/${key}`;
  await sellingPage.goto(url);
  await sellingPage.waitForTimeout(4000);
  if (first) {
    await sellingPage.reload();
  }

  const cancelBtn = await sellingPage.$('button.OrderManager--second-button');

  if (!cancelBtn){
    console.log('key : ', key);
    await sellingPage.close();
    return;
  }
  await cancelBtn.click();

  
  
  handleNotificationPage(browser, async (page) => {
    const connectBtn = await page.waitForSelector('button.sc-bqiRlB.hLGcmi.sc-hBUSln.dhBqSt');
    await connectBtn.click();
  });
  await sellingPage.waitForTimeout(10000);
  await sellingPage.close();
};

export default cancelListing;
