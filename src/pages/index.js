import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout';
import HomePage from '../components/homepage/HomePage';

const IndexPage = ({ pageContext }) => (
  <Layout page={pageContext?.page}>
    <HomePage page={pageContext?.page}/>
  </Layout>
);

export default IndexPage;
