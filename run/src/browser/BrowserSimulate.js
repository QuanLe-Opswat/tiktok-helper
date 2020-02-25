const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const Constant = require('../Constant');

puppeteer.use(pluginStealth());

class BrowserSimulate {
  constructor(userAgent) {

    this.userAgent = Constant.UserAgent;
    this.args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
    ];

    if (userAgent) {
      this.userAgent = userAgent;
    }

    this.args.push(`--user-agent="${this.userAgent}"`);

    this.options = {
      args: this.args,
      headless: true,
      ignoreHTTPSErrors: true,
      userDataDir: './tmp',
    };
  }

  async init(url) {
    this.browser = await puppeteer.launch(this.options);
    this.page = await this.browser.newPage();
    await this.page.goto(url ? url : 'https://www.tiktok.com/trending', { waitUntil: 'load' });

    return this;
  }

  async body() {
    return await this.page.content();
  }

  async close() {
    await this.browser.close();
    this.browser = null;
    this.page = null;
  }
}

module.exports = BrowserSimulate;
