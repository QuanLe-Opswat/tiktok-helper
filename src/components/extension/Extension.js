import React from 'react';
import versionInfo from '../../../static/version';

import './Extension.scss';

const Extension = () => {

  const { version_string } = versionInfo;

  return (<div className='extensionComponent'>
    <h3>Hướng dẫn cài đặt và Update Tiktok Extension - version: <span className='versionValue'>{version_string}</span></h3>
    <h6>1. <a href='/tiktok_0_1_2.zip'>Tải file zip (Extension)</a> về và giải nén</h6>
    <h6>2. Truy cập <a href='chrome://extensions/' target='_blank' rel="noopener noreferrer">chrome://extensions/</a></h6>
    <h6>3. Xoá Extension tên <span className='spare'>Titktok Download Helper</span> cũ nếu có</h6>
    <h6>4. Cài đặt Extension <span className='spare'>Titktok Download Helper</span> mới tải về</h6>
    <p>4.1 Bật <span className='spare'>Chế độ dành cho nhà phát triển</span></p>
    <p>4.2 Chọn <span className='spare'>Tải tiện ích đã giải nén</span></p>
    <p>4.3 Chọn thư mục Extension đã giải nén</p>
    <p><img className='imageInstall' src='/tiktokExtension.png' alt='Setup extension'/></p>
    <p><img className='imageInstall' src='/tiktokExtension2.png' alt='Setup extension2'/></p>

    <h6>5. Truy cập web tiktok để tải video trên mỗi video</h6>
    <p><img className='imageInstall' src='/tiktokExtension3.png' alt='Setup extension3'/></p>

  </div>);

};

export default Extension;
