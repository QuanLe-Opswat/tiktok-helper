import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../../components/layout';
import Extension from '../../components/extension/Extension';

const ExtensionPage = ({ pageContext }) => (
  <Layout page={pageContext?.page}>
    <Extension/>
  </Layout>
);

export default ExtensionPage;
