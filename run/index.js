const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));
// app.set('Access-Control-Allow-Origin', '*');
app.use(cors());

const axios = require('axios');

const Constant = {
  ERROR_TokenNotFount: 'Token not found, try again...',
  ERROR_DownloadIdNotFount: 'Download Id not found, try again...',
  ERROR_DownloadUrlNotFount: 'Download Url not found, try again...',
  ERROR_UrlInvalid: 'Your Tiktok link is invalid, try again...',
  ERROR_CookieFail: 'Get Cookies section fail, try again...',

  ERROR_Network: 'Network error!!!',
};

app.get('/', (req, res) => {
  console.log('Hello world received a request.');
  res.send('Hello there!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});

app.get('/download', async (req, res) => {
  let url = req.query.url;
  // url = 'https://www.tiktok.com/@elkayvietnam/video/6796474154729082114';
  res.send(await getTiktokDownloadLink(url));
});

const getTiktokDownloadLink = async (url) => {
  try {
    // Find token
    let response = await axios.get('https://musicallydown.com/');
    let match = response.data.match(/name="vtoken"\s*value="(\w+)"/);
    if (!match || match.length < 2) {
      return { error: Constant.ERROR_TokenNotFount };
    }
    const vtoken = match[1];

    // Get cookie => can ignore if in client side
    let cookie;
    try {
      cookie = response.headers['set-cookie'][0].split(';')[0];
    } catch (e) {
      // ignore
    }
    if (!cookie) {
      return { error_msg_server: Constant.ERROR_CookieFail, header: response.headers };
    }

    // Request video id
    response = await axios.post('https://musicallydown.com/download', `url=${encodeURIComponent(url)}&vtoken=${vtoken}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': cookie },
    });
    match = response.data.match(/name="q"\s*value="(\w+)"/);
    if (!match || match.length < 2) {
      match = response.data.match(/Materialize.toast\('Url Field is Empty, Try Again!', 5000\)/);
      if (match && match.length > 0) {
        return { error_msg_server: Constant.ERROR_UrlInvalid };
      }
      match = response.data.match(/Materialize.toast\('error: Video is private!', 5000\)/);
      if (match && match.length > 0) {
        return { error_msg_server: Constant.ERROR_UrlInvalid };
      }
      return { error_msg_server: Constant.ERROR_DownloadIdNotFount };
    }
    const id = match[1];
    // Get image
    match = response.data.match(/poster="([^"]+)"/);
    let image = '';
    if (match && match.length >= 2) {
      image = match[1];
    }

    // Request download Url
    response = await axios.post('https://musicallydown.com/ajax/get_url.json', `q=${id}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (response && response.data && response.data.url && response.data.url.d_url) {
      return { data: { url: response.data.url.d_url, image } };
    } else {
      return { error_msg_server: Constant.ERROR_DownloadUrlNotFount };
    }
  } catch (e) {
    console.log(e);
    return { error_msg_server: Constant.ERROR_Network };
  }
};
