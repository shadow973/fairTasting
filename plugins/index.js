// plugins/index.js
const { withFacebook } = require('./ios/with-facebook');

module.exports = function withCustomPlugins(config, props) {
  config = withFacebook(config);
  return config;
};