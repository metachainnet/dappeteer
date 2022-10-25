import pupeteer from 'puppeteer';

export interface CheckListingParam {
  page: pupeteer.Page;
  key: string;
}

const checkListing = async (param: CheckListingParam): Promise<string | null> => {
  const { page, key } = param;
  const url = `https://opensea.io/assets/solana/${key}`;

  await page.goto(url);
  await page.waitForTimeout(2000);

  try {
    const makeOfferBtn = await page.waitForSelector('button.sc-29427738-0.sc-8d097ef7-0.kqzAEQ.igZRzq');
    const buynowBtn = await page.waitForSelector('button.sc-29427738-0.sc-8d097ef7-0.kqzAEQ.hpAYnk');

    if (!buynowBtn && makeOfferBtn) {
      // not listing
      return null;
    } else {
      return key;
    }
  } catch (e) {
    // timeout
    return null;
  }
};

export default checkListing;
