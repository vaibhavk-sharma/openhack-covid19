const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const lusca = require('lusca');
const cors = require('cors');
dotenv.config({ path: 'developmet.env' });

/**
 * route handlers.
 */
const apiRoutes = require('./api');

/**
 * Create Express server.
 */
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

/**
 * Api routes.
 */
app.get('/', apiRoutes.index);
app.get('/api', apiRoutes.index);
app.get('*', apiRoutes.index);
/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('env', process.env.NODE_ENV === 'development' ? 'development' : 'production');
/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
