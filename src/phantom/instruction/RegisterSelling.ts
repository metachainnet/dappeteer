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
  await sellingPage.waitForTimeout(3000)

  const priceInput = await sellingPage.waitForSelector('#price');
  await priceInput.type(price.toString());

  const durationBtn = await sellingPage.waitForSelector('#duration');
  await durationBtn.click();

  const [startDate, endDate] = await sellingPage.$$('input[type="date"]');
  await startDate.type('0714');
  await endDate.type('0814');

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

  handleNotificationPage(browser, async (page) => {
    const connectBtn = await page.waitForSelector('button.sc-bqiRlB.hLGcmi.sc-hBUSln.dhBqSt');
    await connectBtn.click();
    await sellingPage.waitForTimeout(10000);
    await sellingPage.close();
  });
};

export default registerSelling;
