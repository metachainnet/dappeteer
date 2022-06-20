import pupeteer from 'puppeteer';

export interface RegisterSellingParam {
  page: pupeteer.Page;
  key: string;
  price: number;
}

const registerSelling = async (param: RegisterSellingParam): Promise<void> => {
  const { page, key, price } = param;
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
};

export default registerSelling;
