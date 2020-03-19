const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../util');

passport.use(
   new LocalStrategy({ usernameField: 'userId', passwordField: 'password' }, (userId, password, done) => {
      const content = User.findById(userId);
      if (content && typeof content === 'object' && content.userId === userId && content.password === password) {
         done(null, {
            name: content.name,
            userId: content.userId,
            image: content.image,
         });
      } else {
         done(null, false, { message: 'Incorrect Email/Username/Password' });
      }
   })
);

/* login related api routes */
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
   res.json({ userId: req.user.userId, name: req.user.name });
});

/* TODO: delete these fallback urls */
router.get('/login/success', (req, res) => res.send('Welcome ' + req.query.username + '!!'));
router.get('/login/error', (req, res) => res.send('error logging in'));

/* return only profile data */
router.get('/:userId', (req, res) => {
   const { userId } = req.params;
   const user = User.findById(userId, ['name', 'userId', 'designation', 'image', 'kudosBalance', 'kudosGiven']);
   res.json(user);
});

/* return only comments data */
router.get('/:userId/comments', (req, res) => {
   const { userId } = req.params;
   const user = User.findById(userId, ['kudos']);
   res.json(user);
});

module.exports = router;
