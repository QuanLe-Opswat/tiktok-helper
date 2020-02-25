import React, { useState, useMemo, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import LinkInput from '../../ui/link-input/LinkInput';

import './HomePage.scss';
import LoadingComponent from '../../ui/loading/LoadingComponent';
import VideoComponent from '../../ui/video/VideoComponent';
import TrendInput from '../../ui/trend-input/TrendInput';

const HomePage = ({ page }) => {

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

  const inputDOM = useMemo(() => {
    console.log(page);
    switch (page) {
      case 'trend':
        return <TrendInput getResponse={getResponse}/>;
      case 'video':
      default:
        return <LinkInput getResponse={getResponse}/>;
    }
  }, [page]);

  const mainDOM = useMemo(() => (
    <>
      {!loading &&
      <Card>
        <Card.Body>
          {inputDOM}
        </Card.Body>
      </Card>}
    </>
  ), [loading, inputDOM]);

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

