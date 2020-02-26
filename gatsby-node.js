/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const path = require(`path`);

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: `/`,
    component: require.resolve('./src/pages/index.js'),
    context: { page: 'video' },
  });

  createPage({
    path: `/trend`,
    component: require.resolve('./src/pages/index.js'),
    context: { page: 'trend' },
  });

  createPage({
    path: `/extension`,
    component: require.resolve('./src/pages/extension/extension.js'),
    context: { page: 'extension' },
  });
};
