const router = require('express').Router();

const userRoutes = require('/userRoutes'); // make sure the path is correct

// Use the user routes under the '/users' endpoint
router.use('/users', userRoutes);

module.exports = router;