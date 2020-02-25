import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import tiktokGetLink from '../../service/TiktokGetLink';

import './TrendInput.scss';

const TrendInput = ({ getResponse }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading) {
      (async () => {
        let response = await tiktokGetLink.getTrend();
        setLoading(false);
        if (response.error) {
          setError(response.error);
        } else {
          getResponse([...response]);
        }
      })();
    }
  }, [loading, getResponse]);

  const errorDOM = useMemo(() => (<>{error && <Alert variant='danger'>{error}</Alert>}</>), [error]);

  return <div className='trendInput'>
    <Button variant="primary" onClick={() => setLoading(true)} disabled={loading}>
      {loading && <span className='spinnerButton'>
            <Spinner
              animation="border"
              size="sm"
            />
          </span>}
      Lấy Video Từ Trend Tiktok
    </Button>
    {errorDOM}
  </div>;

};

export default TrendInput;

