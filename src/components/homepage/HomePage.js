import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import LinkInputComponent from '../../ui/link-input/LinkInputComponent';
import TokenInputComponent from '../../ui/token-input/TokenInputComponent';
import tiktokGetLink from '../../service/TiktokGetLink';

import './HomePage.scss';

const HomePage = () => {

  const [token, setToken] = useState('');

  const mainButtonClick = (link) => {
    (() => {
      console.log(link);
      console.log(token);

      let promise = tiktokGetLink.get(link, token);
      console.log(promise);
    })();
  };

  return <div className='HomePage'>
    <Card>
      <Card.Body>
        <LinkInputComponent onClick={mainButtonClick}/>
        <TokenInputComponent tokenChange={(token) => setToken(token)}/>
      </Card.Body>
    </Card>
  </div>;
};

export default HomePage;

