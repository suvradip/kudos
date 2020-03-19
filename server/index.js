require('dotenv').config();
const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const app = express();
const config = require('../nuxt.config.js');
const apiRouter = require('./api');
const { User } = require('./util');

app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production';
// if (config.dev) {
app.use(logger('dev'));
// }
app.use(bodyParser.json());
/*  parse: requested data in application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter);

passport.serializeUser((user, cb) => {
   cb(null, user.userId);
});

passport.deserializeUser((userId, cb) => {
   const content = User.findById(userId);
   if (content && typeof content === 'object') cb(null, content);
});

async function start() {
   // Init Nuxt.js
   const nuxt = new Nuxt(config);
   const PORT = process.env.PORT || 3000;

   await nuxt.ready();
   // Build only in dev mode
   if (config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
   }

   // Give nuxt middleware to express
   app.use(nuxt.render);

   // Listen the server
   app.listen(PORT);
   consola.ready({
      message: `Server listening on http://localhost:${PORT}`,
      badge: true,
   });
}
start();
