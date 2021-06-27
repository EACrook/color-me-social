const router = require('express').Router();
// const userController = require('../../controllers/user-controller');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;