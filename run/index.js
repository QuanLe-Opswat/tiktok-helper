const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));

app.use(cors());

require('tls').DEFAULT_ECDH_CURVE = 'auto';

const axios = require('axios');

const Constant = {
  ERROR_TokenNotFount: 'Token not found, try again...',
  ERROR_DownloadIdNotFount: 'Download Id not found, try again...',
  ERROR_DownloadUrlNotFount: 'Download Url not found, try again...',
  ERROR_UrlInvalid: 'Your Tiktok link is invalid, try again...',
  ERROR_CookieFail: 'Get Cookies section fail, try again...',

  ERROR_InternalServerError: 'Internal server error, please contact admin...',
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
  // url = 'https://www.iesdouyin.com/share/video/6796530901963590927/?region=CN&mid=6786563413751122702&u_code=0&titleType=title';
  let result = { error_msg_server: Constant.ERROR_UrlInvalid };
  const splits = url ? url.split('/') : undefined;
  if (splits && splits.length > 3) {
    const domain = splits[2];
    if (domain.includes('tiktok')) {
      result = await getTiktokDownloadLink(url);
    } else if (domain.includes('douyin')) {
      result = await getTiktokCnDownloadLink(url);
    }
  }

  return res.send(result);
});

const getTiktokDownloadLink = async (url) => {
  try {
    // Find token
    let response = await axios.get('https://musicallydown.com/');
    const { error_msg_server, token, cookie } = getTokenCookies(response, response.data.match(/name="vtoken"\s*value="(\w+)"/));
    if (error_msg_server) {
      return { error_msg_server };
    }

    // Request video id
    response = await axios.post('https://musicallydown.com/download', `url=${encodeURIComponent(url)}&vtoken=${token}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': cookie },
    });
    let match = response.data.match(/name="q"\s*value="(\w+)"/);
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
    return { error_msg_server: Constant.ERROR_InternalServerError };
  }
};

const getTiktokCnDownloadLink = async (url) => {

  try {
    // Find token
    let response = await axios.get('http://pcsdownload.com/en/download-tiktok-china-video');

    const { error_msg_server, token, cookie } = getTokenCookies(response, response.data.match(/name="token"\s*value="(\w+)"/));
    if (error_msg_server) {
      return { error_msg_server };
    }

    // Request video id
    response = await axios.post('https://pcsdownload.com/handle.php', `url=${encodeURIComponent(url)}&token=${token}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': cookie },
    });

    if (response && response.data) {
      let json = JSON.parse(`{${response.data.split('{')[1]}`);
      return { data: { url: `https://pcsdownload.com/videos/${json.videoURL}`, image: json.imageURL } };
    } else {
      return { error_msg_server: Constant.ERROR_UrlInvalid };
    }
  } catch (e) {
    console.log(e);
    return { error_msg_server: Constant.ERROR_InternalServerError };
  }
};

const getTokenCookies = (response, match) => {
  if (!match || match.length < 2) {
    return { error_msg_server: Constant.ERROR_TokenNotFount };
  }
  const token = match[1];
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

  return { token, cookie };
};
