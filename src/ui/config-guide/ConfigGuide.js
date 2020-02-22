import React from 'react';
import { Alert } from 'react-bootstrap';

import './ConfigGuide.scss';

const ConfigGuide = () => {

  return <div className='configGuide'>
    <Alert variant='danger'>Trình Duyệt Của Bạn Hiện Không Tương Thích Để Chạy Ứng Dụng</Alert>
    <h5>Vui lòng làm theo hướng dẫn sau để sử dụng:</h5>
    <h6><b>I.</b> Tắt chức năng <b>out-of-blink-cors</b> của Chrome</h6>
    <p>1. Truy cập <a href='chrome://flags/#out-of-blink-cors' target='_blank' rel="noopener noreferrer">chrome://flags/#out-of-blink-cors</a></p>
    <p>2. Chọn “Disable” cho <span className='square'>out-of-blink-cors</span></p>
    <p>3. Khởi động lại Chrome</p>
    <img src={`../../ChromeCors.PNG`} alt='Chrome Cors setting'/>
    <h6><b>II.</b> Mở trình duyệt Chrome với tuỳ chỉnh bỏ <b>CORS</b></h6>
    <p>1. Tạo 1 shortcut ngoài Desktop (right click ngoài Desktop chọn “New -> Shortcut”)</p>
    <p>2. Điền vào <span className='square'>"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp</span></p>
    <p>3. Click OK -> chạy Chrome với shortcut vừa tạo</p>
    <p>4. Tham khảo tại <a href='https://alfilatov.com/posts/run-chrome-without-cors/' target='_blank' rel="noopener noreferrer">https://alfilatov.com/posts/run-chrome-without-cors/</a> để thêm chi tiết</p>
    <img src={`../../shortcutChrome.PNG`} alt='Chrome Cors setting'/>

  </div>;
};

export default ConfigGuide;

