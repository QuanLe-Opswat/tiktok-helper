import axios from 'axios';

class TiktokGetLink {
  get(link, token) {
    const bodyFormData = new FormData();
    bodyFormData.set('ic-request', 'true');
    bodyFormData.set('id', link);
    bodyFormData.set('ic-element-id', 'main_page_form');
    bodyFormData.set('ic-id', '1');
    bodyFormData.set('ic-target-id', 'active_container');
    bodyFormData.set('ic-trigger-id', 'main_page_form');
    bodyFormData.set('token', token);
    bodyFormData.set('ic-current-url', '/');
    bodyFormData.set('_method', 'POST');

    return axios({
      url: 'https://ssstiktok.com/results',
      method: 'post',
      data: bodyFormData,
      headers: {
        // 'user-agent': navigator.userAgent,
        'x-http-method-override': 'POST',
        'x-ic-request': 'true',
        'x-requested-with': 'XMLHttpRequest',
      },
    });
  }
}

export default new TiktokGetLink();
