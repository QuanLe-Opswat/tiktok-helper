import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const LinkInputComponent = ({ onClick }) => {

  const [link, setLink] = useState('');

  return <>
    <label htmlFor="basic-url">Tiktok link</label>
    <InputGroup className="mb-3">
      <FormControl
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Insert link..."
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={() => onClick(link)}>Verify</Button>
      </InputGroup.Append>
    </InputGroup>
  </>;
};

export default LinkInputComponent;

