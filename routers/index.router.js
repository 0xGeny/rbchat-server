require('dotenv').config()
var session = require('express-session');
var jwt = require('express-jwt');

var authRouter = require('./auth.router');
var apiRouter = require('./api.router');

var errorHandler = require('../helpers/http-error-handler');

const route = (app) => {

  app.use('/auth', authRouter);
  app.use(jwt({ secret: process.env.SECRET_KEY , algorithms: ['HS256'] }));
  app.use('/api', apiRouter);

  // global error handler
  app.use(errorHandler);
}

module.exports = route;