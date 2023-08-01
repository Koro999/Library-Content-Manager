const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');
const loanRoutes = require('./loanRoutes'); //include loan routes 


router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/loans', loanRoutes)


module.exports = router;