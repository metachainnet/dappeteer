import pupeteer from 'puppeteer';

import handleNotificationPage from './HandleNotification';

export interface RegisterSellingParam {
  browser: pupeteer.Browser;
  key: string;
  price: number;
}

const registerSelling = async (param: RegisterSellingParam): Promise<void> => {
  const { browser, key, price } = param;
  const sellingPage = await browser.newPage();
  const url = `https://opensea.io/assets/solana/${key}/sell`;
  await sellingPage.goto(url);

  const priceInput = await sellingPage.waitForSelector('#price');
  await priceInput.type(price.toString());

  const durationBtn = await sellingPage.waitForSelector('#duration');
  await durationBtn.click();

  const [startDate, endDate] = await sellingPage.$$('input[type="date"]');
  await startDate.type('20220714');
  await endDate.type('20220814');

  const startTime = await sellingPage.waitForSelector('#start-time');
  await startTime.type('08:00');
  await startTime.type('a');
  const endTime = await sellingPage.waitForSelector('#end-time');
  await endTime.type('08:00');
  await endTime.type('a');

  const h1 = await sellingPage.waitForSelector('h1');
  await h1.click();

  const completeBtn = await sellingPage.waitForSelector('button[type="submit"]');
  await completeBtn.click();

  await sellingPage.waitForTimeout(2000);

  const continueBtn = await sellingPage.waitForSelector('div[role="dialog"] button');
  await continueBtn.click();

  handleNotificationPage(browser, async (page) => {
    const approveBtn = await page.waitForSelector('button[type="submit"]');
    await approveBtn.click();
  });

  await sellingPage.waitForTimeout(4000);
  await sellingPage.close();
};

export default registerSelling;
