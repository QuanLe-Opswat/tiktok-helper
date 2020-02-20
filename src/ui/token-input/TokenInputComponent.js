import React, { useState, useEffect } from 'react';
import { InputGroup, Form } from 'react-bootstrap';

import './TokenInputComponent.scss';

const tokenStoreKey = '__token_session';

const TokenInputComponent = ({ tokenChange }) => {

  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem(tokenStoreKey) || '';
    setToken(token);
    tokenChange(token);
  }, [tokenChange]);

  const handleChange = (e) => {
    const token = e.target.value;
    localStorage.setItem(tokenStoreKey, token);
    tokenChange(token);
    setToken(token);
  };

  return <div className='tokenInput'>
    <InputGroup className="mb-3">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Token</Form.Label>
        <Form.Control value={token} placeholder="a023d5eaff16cb541c493ad8b77255e8l8d283b66eaca3fde32dc6169d5a3c4a7" onChange={handleChange}/>
      </Form.Group>
    </InputGroup>
  </div>;
};

export default TokenInputComponent;

