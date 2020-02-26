const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

puppeteer.use(pluginStealth());

exports.browserSimulate = async (req, res) => {
  let url = req.query.url || req.body.url || 'https://www.tiktok.com/trending';

  const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36';
  let args = [
    `--user-agent="${this.userAgent}"`,
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
  ];

  const options = {
    args: args,
    headless: true,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
  };

  const browser = await puppeteer.launch(this.options);
  const page = await this.browser.newPage();
  await page.goto(url, { waitUntil: 'load' });

  await new Promise(r => setTimeout(r, 5000)); // wait 5s
  const content = await this.page.content();

  await browser.close();

  res.status(200).send(content);
};
