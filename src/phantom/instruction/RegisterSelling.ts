import pupeteer from 'puppeteer';

import handleNotificationPage from './HandleNotification';

export interface RegisterSellingParam {
  browser: pupeteer.Browser;
  key: string;
  price: number;
}

const registerSelling = async (param: RegisterSellingParam): Promise<void> => {
  const { browser, key, price } = param;
  const page = await browser.newPage();
  const url = `https://opensea.io/assets/solana/${key}/sell`;
  await page.goto(url);

  const priceInput = await page.waitForSelector('#price');
  await priceInput.type(price.toString());

  const durationBtn = await page.waitForSelector('#duration');
  await durationBtn.click();

  const [startDate, endDate] = await page.$$('input[type="date"]');
  const startTime = await page.waitForSelector('#start-time');
  const endTime = await page.waitForSelector('#end-time');

  await startDate.type('0628');
  await endDate.type('0728');
  await startTime.type('21:00');
  await startTime.type('a');
  await endTime.type('21:00');
  await endTime.type('a');

  const completeBtn = await page.waitForSelector('button[type="submit"]');
  await completeBtn.click();

  handleNotificationPage(browser, async (page) => {
    const connectBtn = await page.waitForSelector('button.sc-bqiRlB.hLGcmi.sc-hBUSln.dhBqSt');
    await connectBtn.click();
  });
};

export default registerSelling;
