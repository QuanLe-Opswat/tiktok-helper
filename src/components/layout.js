/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Header from './header';
import { Button, Col, Row } from 'react-bootstrap';
import classname from 'classnames';

import './layout.scss';

const Layout = ({ children, page, isHide }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const toolbarClass = classname({ 'isHide': isHide }, 'toolbar');

  return (
    <div className='layout'>
      <Header siteTitle={data.site.siteMetadata.title}/>
      <div className='layoutBody'>
        <Col>
          <Row>
            <div className={toolbarClass}>
              <Link to='/'>
                <Button variant={page === 'video' ? 'primary' : 'outline-primary'} size="sm">
                  Video
                </Button>
              </Link>

              <Link to='/trend'>
                <Button variant={page === 'trend' ? 'primary' : 'outline-primary'} size="sm">
                  Trend
                </Button>
              </Link>

              <Link to='/extension'>
                <Button variant={page === 'extension' ? 'primary' : 'outline-primary'} size="sm">
                  Extension
                </Button>
              </Link>
            </div>
          </Row>
          <Row>
            <main>{children}</main>
          </Row>
        </Col>
        <footer
          style={{ marginTop: '20px', textAlign: 'center' }}>
          © {new Date().getFullYear()}, Built by QuanLe
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
