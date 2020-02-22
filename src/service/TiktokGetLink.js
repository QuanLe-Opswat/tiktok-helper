import axios from 'axios';
import Constant from './Constant';

class TiktokGetLink {
  async getVideo(url) {
    // chrome://flags/#out-of-blink-cors
    // https://alfilatov.com/posts/run-chrome-without-cors/
    try {
      // Find token
      let response = await axios.get('https://musicallydown.com/');
      let match = response.data.match(/name="vtoken"\s*value="(\w+)"/);
      if (!match || match.length < 2) {
        return { error: Constant.ERROR_TokenNotFount };
      }
      const vtoken = match[1];

      // Request video id
      response = await axios.post('https://musicallydown.com/download', `url=${encodeURIComponent(url)}&vtoken=${vtoken}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      match = response.data.match(/name="q"\s*value="(\w+)"/);
      if (!match || match.length < 2) {
        match = response.data.match(/Materialize.toast\('Url Field is Empty, Try Again!', 5000\)/);
        if (match && match.length > 0) {
          return { error: Constant.ERROR_UrlInvalid };
        }
        match = response.data.match(/Materialize.toast\('ERROR: Video is private!', 5000\)/);
        if (match && match.length > 0) {
          return { error: Constant.ERROR_UrlInvalid };
        }
        return { error: Constant.ERROR_DownloadIdNotFount };
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
      const urlResult = response?.data?.url?.d_url;
      if (!urlResult) {
        return { error: Constant.ERROR_DownloadUrlNotFount };
      }
      return { url: urlResult, image };
    } catch (e) {
      console.log(e);
      return { error: Constant.ERROR_Network };
    }
  }

  async checkCors() {
    try {
      await axios.get('https://musicallydown.com/');
      return true;
    } catch (error) {
      // console.log(JSON.stringify(error));
      return false;
    }
  }
}

export default new TiktokGetLink();
