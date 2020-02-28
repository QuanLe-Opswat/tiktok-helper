'use strict';

// import axios from 'axios';
// import Constant from '../src/service/Constant';

const DONE_CLASS_NAME = '_quanle_done';
const FETCHING_CLASS_NAME = '_quanle_fetch';
const VERSION = 2000;

const host = 'https://tiktok-7f5yfldkeq-de.a.run.app/download';
const web = 'https://tiktok-helper-3561366311.gtsb.io';

const handleRest = async (url) => {
  try {
    let response = await new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (e) {
            reject(e);
          }
        }
      };
      xhttp.onerror = function() {
        reject('error http');
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    });

    if (response && response.data) {
      return response.data;
    }
    console.error(response);
  } catch (e) {
    console.error(e);
  }
  return false;
};

const getVideo = (url) => {
  return handleRest(`${host}?url=${encodeURIComponent(url)}`);
};

// Small video tiktok
const fetchVideoSmallTiktok = async (dom, needUpdate) => {
  let node = document.createElement('A');

  if (needUpdate) {
    node.innerHTML = 'Yêu Cầu Update...';
    node.className = '_quanle_holder btn btn-primary';
    node['href'] = `${web}/extension`;
    dom.parentNode.appendChild(node);
    return;
  }

  node.innerHTML = 'Đang Kiểm Tra...';
  node.className = '_quanle_holder btn btn-warning';
  dom.parentNode.appendChild(node);
  // Fetch link
  const result = await getVideo(dom['href']);
  node.disabled = false;

  if (result) {
    node['href'] = result.url;
    node['target'] = '_blank';
    node['download'] = 'video';
    node.innerHTML = 'Tải Về';
    node.className = '_quanle_holder btn btn-primary';
  } else {
    node.innerHTML = 'Thất Bại! Thử Lại';
    node.className = '_quanle_holder btn btn-danger';
    node.onclick = function() {
      node.parentNode.removeChild(node);
      fetchVideoSmallTiktok(dom);
    };
  }
};

// Big video tiktok
const fetchVideoBigTiktok = async (dom, needUpdate) => {
  let node = document.createElement('A');

  if (needUpdate) {
    node.innerHTML = 'Yêu Cầu Update...';
    node.className = '_quanle_holder btn btn-primary';
    node['href'] = `${web}/extension`;
    dom.appendChild(node);
    return;
  }

  node.innerHTML = 'Đang Kiểm Tra...';
  node.className = '_quanle_holder btn btn-warning';
  dom.appendChild(node);
  // Fetch link
  const result = await getVideo(window.location.href);
  node.disabled = false;

  if (result) {
    node['href'] = result.url;
    node['target'] = '_blank';
    node['download'] = 'video';
    node.innerHTML = 'Tải Về';
    node.className = '_quanle_holder btn btn-primary';
  } else {
    node.innerHTML = 'Thất Bại! Thử Lại';
    node.className = '_quanle_holder btn btn-danger';
    node.onclick = function() {
      node.parentNode.removeChild(node);
      fetchVideoBigTiktok(dom);
    };
  }
};

const findVideos = (className) => {
  const videoDOM = document.getElementsByClassName(className);
  let videoDOMs = [];
  for (let i = 0; i < videoDOM.length; i++) {
    videoDOMs.push(videoDOM[i]);
  }

  videoDOMs = videoDOMs.filter(v => !v.className.includes(FETCHING_CLASS_NAME));
  videoDOMs.forEach(v => v.className += ' ' + FETCHING_CLASS_NAME);
  return videoDOMs;
};

const getVideoDOM = (needUpdate) => {
  // Small video tiktok
  let videoDOMs = findVideos('video-feed-item-wrapper');
  videoDOMs.forEach(v => fetchVideoSmallTiktok(v, needUpdate));

  // Big video tiktok
  videoDOMs = findVideos('video-card-container');
  videoDOMs.forEach(v => fetchVideoBigTiktok(v, needUpdate));

  // Big video tiktok CN
  videoDOMs = findVideos('video-box fl');
  videoDOMs.forEach(v => fetchVideoBigTiktok(v, needUpdate));
  // console.log(videoDOMs);
};

const checkVersion = () => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        try {
          const json = JSON.parse(this.responseText);
          resolve(json.version > VERSION);
        } catch (e) {
          resolve(false);
        }
      }
    };
    xhttp.onerror = function() {
      resolve(false);
    };
    xhttp.open('GET', `${web}/version.json`, true);
    xhttp.send();
  });
};

const loop = (needUpdate) => {
  setTimeout(() => {
    getVideoDOM(needUpdate);
    loop(needUpdate);
  }, 2000);
};

checkVersion().then(needUpdate => {
  console.log('need update:' + needUpdate);
  loop(needUpdate);
});

