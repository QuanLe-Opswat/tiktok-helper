import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../../components/layout';
import FbReferenceUpload from '../../components/fb-ref-upload/FbReferenceUpload';

const fbReferenceUploadPage = ({ pageContext }) => (
  <Layout page={pageContext?.page} isHide={true}>
    <FbReferenceUpload/>
  </Layout>
);

export default fbReferenceUploadPage;
