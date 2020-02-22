import React, { useState, useMemo, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import LinkInputComponent from '../../ui/link-input/LinkInputComponent';

import tiktokGetLink from '../../service/TiktokGetLink';

import './HomePage.scss';
import LoadingComponent from '../../ui/loading/LoadingComponent';
import ConfigGuide from '../../ui/config-guide/ConfigGuide';
import VideoComponent from '../../ui/video/VideoComponent';

const HomePage = () => {

  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const isOk = await tiktokGetLink.checkCors();
      setLoading(false);
      if (!isOk) {
        setShowGuide(true);
      }
    })();
  }, []);

  const getResponse = (response) => {
    console.log(response);
    setVideos(response);
  };

  const loadingDOM = useMemo(() => (<>{loading && <LoadingComponent/>}</>),
    [loading]);

  const mainDOM = useMemo(() => (
    <>
      {!loading && !showGuide &&
      <Card>
        <Card.Body>
          <LinkInputComponent getResponse={getResponse}/>
        </Card.Body>
      </Card>}
    </>
  ), [loading, showGuide]);

  const guideDOM = useMemo(() => (
    <>
      {!loading && showGuide && <ConfigGuide/>}
    </>
  ), [loading, showGuide]);

  const videosDOM = useMemo(() =>
      videos.map((v, index) => <VideoComponent index={index} data={v}/>)
    , [videos]);

  return <div className='HomePage'>
    {loadingDOM}
    {mainDOM}
    {guideDOM}
    {videosDOM}
  </div>;
};

export default HomePage;

