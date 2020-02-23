import React from 'react';
import { Card } from 'react-bootstrap';

import './VideoComponent.scss';

const VideoComponent = ({ data }) => {

  return (<a className='videoComponent' href={data.url} download='video_22.mp4' target='_blank' rel="noopener noreferrer">
    <Card>
      <Card.Img src={data.image}/>
      <Card.ImgOverlay>
      </Card.ImgOverlay>
    </Card>
  </a>);
};

export default VideoComponent;

