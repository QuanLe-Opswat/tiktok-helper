import React, { useRef, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Papa from 'papaparse';

import './FbReferenceUpload.scss';

const FbReferenceUpload = () => {

  const configRef = useRef(null);
  const [fileConfig, setFileConfig] = useState(undefined);

  const filesRef = useRef(null);
  const [filesUpload, setFilesUpload] = useState([]);

  const onConfigChange = (e) => {
    setFileConfig(e.target.files[0]);
    // parse csv file: https://www.papaparse.com/
  };

  const onFilesChange = (e) => {
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }
    setFilesUpload(files);
  };

  return <div className='fbReferenceUpload'>
    <Row>
      <Col lg={3}>
        <Row className='configContainer'>
          <div>
            <h5>
              File Configurator
            </h5>
            <input type='file' accept='.csv' ref={configRef} onChange={onConfigChange} style={{ display: 'none' }}/>
            <div>
              <Button size='sm' variant='outline-primary' onClick={() => configRef.current.click()}>
                Select Config file (*.csv)
              </Button>
              <span className='configFileName'>
            {fileConfig && fileConfig.name}
          </span>
            </div>
            <small>... download template here!!!</small>
          </div>
        </Row>
        <Row>
          <div>
            <h5>
              File Upload
            </h5>
            <input style={{ display: 'none' }} type='file' ref={filesRef} multiple onChange={onFilesChange}/>
            <div>
              <Button size='sm' variant='outline-primary' onClick={() => filesRef.current.click()}>
                Select Files
              </Button>
              <p className='uploadFileInfo'>
                {`Upload files: ${filesUpload.length}`}
              </p>
            </div>
          </div>
        </Row>
      </Col>
      <Col lg={9}>

      </Col>
    </Row>

  </div>;
};

export default FbReferenceUpload;