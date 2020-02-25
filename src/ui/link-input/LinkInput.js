import React, { useMemo, useState } from 'react';
import { InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import tiktokGetLink from '../../service/TiktokGetLink';
import { throttle } from 'lodash';

import './LinkInput.scss';

const LinkInput = ({ getResponse }) => {

  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const verify = (url) => {
    setLink(url);
    setError('');
    setLoading(true);
    (async () => {
      let response = await tiktokGetLink.getVideo(url);
      setLoading(false);
      if (response.error) {
        setError(response.error);
      } else {
        getResponse([response]);
      }
    })();
  };

  const throttleVerify = throttle(verify, 100);

  const errorDOM = useMemo(() => (<>{error && <Alert variant='danger'>{error}</Alert>}</>), [error]);

  return <div className='LinkInput'>
    <label htmlFor="basic-url">Tiktok link</label>
    <InputGroup className="mb-3">
      <FormControl
        value={link}
        onChange={(e) => throttleVerify(e.target.value)}
        placeholder="Insert link..."
      />
      <InputGroup.Append>
        <Button variant="primary" onClick={() => throttleVerify(link)} disabled={loading}>
          {loading && <span className='spinnerButton'>
            <Spinner
              animation="border"
              size="sm"
            />
          </span>}
          Kiểm Tra
        </Button>
      </InputGroup.Append>
    </InputGroup>
    {errorDOM}
  </div>;
};

export default LinkInput;

