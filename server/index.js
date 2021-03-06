/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const usingWebpackDevServer = argv.env && argv.env.wds;
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
let app;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
if (!usingWebpackDevServer) {
  app = express();
  setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/'
  });
} else {
    /* eslint-disable global-require */
  const webpackConfig = require('../internals/webpack/webpack.dev.babel');
  const compiler = require('webpack')(webpackConfig);

  app = new (require('webpack-dev-server'))(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true
  });
  /* eslint-enable global-require */
}

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
