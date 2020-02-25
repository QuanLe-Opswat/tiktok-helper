import axios from 'axios';
import Constant from './Constant';

const HOST = `${Constant.GetHost()}`;

class TiktokGetLink {
  async getVideo(url) {
    // chrome://flags/#out-of-blink-cors
    // https://alfilatov.com/posts/run-chrome-without-cors/
    return this.handleRest(`${HOST}/download?url=${encodeURIComponent(url)}`);
  }

  getTrend() {
    return this.handleRest(`${HOST}/trend`);
  }

  async handleRest(url) {
    try {
      let response = await axios.get(url);
      if (response && response.data) {
        if (response.data.error_msg_server) {
          return { error: `${Constant.ERROR_ServerSide}: ${response.data.error_msg_server}` };
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
