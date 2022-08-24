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
    const makeOfferBtn = await page.waitForSelector('button.sc-1xf18x6-0.sc-glfma3-0.jPlHEK.eqgvEc');
    const buynowBtn = await page.waitForSelector('button.sc-1xf18x6-0.sc-glfma3-0.jPlHEK.ldKPky');

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
