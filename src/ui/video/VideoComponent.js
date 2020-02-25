import React from 'react';
import { Card } from 'react-bootstrap';

import './VideoComponent.scss';

const VideoComponent = ({ data }) => {

  return (<div className='videoComponent'>
    <Card>
      <Card.Img src={data.image}/>
      <Card.ImgOverlay href={data.url} download='video.mp4' target='_blank' rel="noopener noreferrer" as='a'>
      </Card.ImgOverlay>
      {/*<Card.Body>*/}
      {/*  title*/}
      {/*</Card.Body>*/}
    </Card>
  </div>);
};

export default VideoComponent;

