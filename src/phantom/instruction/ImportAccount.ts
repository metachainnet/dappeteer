import * as pupeteer from 'puppeteer';

const importAccount = async (phantomPage: pupeteer.Page, seed: string, password: string): Promise<void> => {
  // TODO 추상화
  const seeds = seed.split(' ');
  if (!(seeds.length === 12 || seeds.length === 24)) {
    throw new Error('Seed length must be 12 or 24 strings');
  }

  const existWalletBtn = await phantomPage.waitForSelector('button.sc-eCImPb.fajfuv');
  await existWalletBtn.click();

  // find seed inputs
  const findSeedElementActions = new Array(12)
    .fill(null)
    .map((_, index) => `#word_${index}`)
    .map((id) => phantomPage.waitForSelector(id));

  const seedElements = await Promise.all(findSeedElementActions);

  // enter the seed
  for (let i = 0; i < seedElements.length; i++) {
    await seedElements[i].type(seeds[i]);
  }

  const getWalletBtn = await phantomPage.waitForSelector('button.sc-eCImPb.fimA-Dk');
  await getWalletBtn.click();

  await phantomPage.waitForTimeout(1000);

  const getSelectedWalletBtn = await phantomPage.waitForSelector('button.sc-eCImPb.fimA-Dk');
  await getSelectedWalletBtn.click();

  const passwordInput = await phantomPage.waitForSelector(
    'div.sc-iCfMLu.sc-jgrJph.dThhlm.eCcjgV input.sc-bBHxTw.kNaMbq',
  );
  await passwordInput.type(password);

  const passwordConfirmInput = await phantomPage.waitForSelector('div.sc-iwjdpV.Xaubw input.sc-bBHxTw.kNaMbq');
  await passwordConfirmInput.type(password);

  const agreeTermsCheckbox = await phantomPage.waitForSelector(
    'div.sc-bdvvtL.sc-ksdxgE.bdpdgN.dvdvQY > span > input[type="checkbox"]',
  );
  await agreeTermsCheckbox.click();

  const continueBtn = await phantomPage.waitForSelector('button.sc-eCImPb.fimA-Dk');
  await continueBtn.click();

  await phantomPage.waitForTimeout(500);
  const continueBtn2 = await phantomPage.waitForSelector('button.sc-eCImPb.fimA-Dk');
  await continueBtn2.click();

  await phantomPage.waitForTimeout(500);
  const continueBtn3 = await phantomPage.waitForSelector('button.sc-eCImPb.fimA-Dk');
  await continueBtn3.click();
};

export default importAccount;
