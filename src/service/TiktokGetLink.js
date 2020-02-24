import axios from 'axios';
import Constant from './Constant';

const HOST = 'https://tiktok-7f5yfldkeq-de.a.run.app/download';

class TiktokGetLink {
  async getVideo(url) {
    // chrome://flags/#out-of-blink-cors
    // https://alfilatov.com/posts/run-chrome-without-cors/
    try {
      // Get link download
      let response = await axios.get(`${HOST}?url=${encodeURIComponent(url)}`);
      if (response && response.data) {
        if (response.data.error) {
          return { error: `${Constant.ERROR_ServerSide}: ${response.error}` };
        } else if (response.data.data) {
          return response.data.data;
        }
      }

    } catch (e) {
      console.log(e);
    }
    return { error: Constant.ERROR_Network };
  }
}

export default new TiktokGetLink();
