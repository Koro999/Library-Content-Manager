const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);


module.exports = router;