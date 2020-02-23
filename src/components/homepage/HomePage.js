import React, { useState, useMemo, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import LinkInputComponent from '../../ui/link-input/LinkInputComponent';

import './HomePage.scss';
import LoadingComponent from '../../ui/loading/LoadingComponent';
import VideoComponent from '../../ui/video/VideoComponent';

const HomePage = () => {

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const getResponse = (response) => {
    console.log(response);
    setVideos(response);
  };

  const loadingDOM = useMemo(() => (<>{loading && <LoadingComponent/>}</>),
    [loading]);

  const mainDOM = useMemo(() => (
    <>
      {!loading &&
      <Card>
        <Card.Body>
          <LinkInputComponent getResponse={getResponse}/>
        </Card.Body>
      </Card>}
    </>
  ), [loading]);

  const videosDOM = useMemo(() =>
      videos.map((v, index) => <VideoComponent key={index} data={v}/>)
    , [videos]);

  return <div className='HomePage'>
    {loadingDOM}
    {mainDOM}
    {videosDOM}
  </div>;
};

export default HomePage;

