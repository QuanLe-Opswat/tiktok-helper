const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));

app.use(cors());

const Constant = require('./src/Constant');
const VideoDownload = require('./src/api/VideoDownload');
const ListApi = require('./src/api/ListApi');

app.get('/', (req, res) => {
  console.log('Hello world received a request.');
  res.send('Hello there!');
});

app.get('/test', async (req, res) => {
  console.log('Test running');
  res.send(await ListApi.getTrendTiktok());
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
      result = await VideoDownload.getTiktokDownloadLink(url);
    } else if (domain.includes('douyin')) {
      result = await VideoDownload.getTiktokCnDownloadLink(url);
    }
  }

  return res.send(result);
});

app.get('/trend', async (req, res) => {
  return res.send(await ListApi.getTrendTiktok());
});
