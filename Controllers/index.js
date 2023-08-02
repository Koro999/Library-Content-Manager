const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes') //added dashboard route

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes) //created instance of route
router.use('/api', apiRoutes);

module.exports = router;
