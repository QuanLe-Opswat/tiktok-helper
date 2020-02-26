const BrowserSimulate = require('../browser/BrowserSimulate'); // Import package
const Constant = require('../Constant');
const VideoDownload = require('./VideoDownload');

const _getTrendTiktok = async () => {
  const browser = new BrowserSimulate();
  await browser.init();

  let count = 10;
  let result = undefined;
  while (--count > 0) {
    await delay(1000);
    let body = await browser.body();
    const matches = body.match(/<a\s*href="(https:\/\/www\.tiktok\.com\/[^\s]*?\/video[^\s]*?)"/g);
    if (matches && matches.length > 0) {
      result = matches.map(m => m.match(/<a\s*href="(https:\/\/www\.tiktok\.com\/[^\s]*?\/video[^\s]*?)"/)[1]);
      break;
    }
  }

  await browser.close();

  if (!result) {
    return { error_msg_server: Constant.ERROR_GetTrendWebFail };
  }

  const videos = (await Promise.all(result.map(v => VideoDownload.getTiktokDownloadLink(v))))
    .filter(v => !v.error_msg_server)
    .map(v => v.data);
  if (videos.length <= 0) {
    return { error_msg_server: Constant.ERROR_GetDownloadLinkFail };
  }

  return { data: videos };
};

const delay = (interval) => {
  return new Promise(r => setTimeout(r, interval));
};

const getTrendTiktok = async () => {
  try {
    return await _getTrendTiktok();
  } catch (err) {
    // console.log(err);
    return { error_msg_server: Constant.ERROR_InternalServerError, err: { message: err.message, stack: err.stack } };
  }
};

module.exports = {
  getTrendTiktok,
};
