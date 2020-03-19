const router = require('express').Router();
const kudosApi = require('./kudos');
const userApi = require('./user');

router.use('/kudos', kudosApi);
router.use('/user', userApi);

module.exports = router;
