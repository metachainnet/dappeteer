import puppeteer from 'puppeteer';

import handleNotification from './phantom/instruction/HandleNotification';
import registerSelling from './phantom/instruction/RegisterSelling';
import * as dappeteer from './phantom/phantompeteer';

async function main(): Promise<void> {
  const browser = await dappeteer.launch(puppeteer);

  dappeteer.setupPhantom(browser, {
    seed: 'patch receive win way lyrics olympic tribe clump noodle shrug reason gossip',
    password: 'Forbiddenkingdom123!',
  });

  const openseaPage = await moveToOpensea(browser);

  handleNotification(browser, async (page) => {
    const connectBtn = await page.waitForSelector('button.sc-bqiRlB.hLGcmi.sc-hBUSln.dhBqSt');
    await connectBtn.click();
  });

  await registerSelling({
    page: openseaPage,
    key: 'G1UCM15bkSaYhTJyTab8xvyNpgR2HnQoHXT2mUHUrhus',
    price: 4.99,
  });
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
