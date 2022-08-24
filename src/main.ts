import puppeteer from 'puppeteer';

import handleNotification from './phantom/instruction/HandleNotification';
import registerSelling from './phantom/instruction/RegisterSelling';
import * as dappeteer from './phantom/phantompeteer';
import secret from './secret';

async function main(): Promise<void> {
  const browser = await dappeteer.launch(puppeteer);

  dappeteer.setupPhantom(browser, {
    seed: secret.seed,
    password: secret.password,
  });

  await moveToOpensea(browser);

  handleNotification(browser, async (page) => {
    const connectBtn = await page.waitForSelector('button.sc-bqiRlB.hLGcmi.sc-hBUSln.dhBqSt');
    await connectBtn.click();
  });

  const addresses = await import('../mint-addresses.json');
  const targetAddresses = addresses.default.slice(0, 2500);
}

async function moveToOpensea(browser: puppeteer.Browser): Promise<puppeteer.Page> {
  const openseaPage = await browser.newPage();
  await openseaPage.goto('http://opensea.io');

  const menuBtn = await openseaPage.waitForSelector('button.NavItem--main.NavItem--withIcon');
  await menuBtn.click();

  const connectWalletBtn = await openseaPage.waitForSelector('ul.NavMobile--menu > li:last-child');
  await connectWalletBtn.click();

  const phantomBtn = await openseaPage.waitForSelector('ul.ConnectCompatibleWallet--wallet-list > li:nth-child(4)');
  await phantomBtn.click();

  return openseaPage;
}

main();
