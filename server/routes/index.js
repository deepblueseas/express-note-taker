const router = require('express').Router();

const apiRoutes = require('./server/routes/apiRoutes.js');

router.use('/api/notes', apiRoutes);

module.exports = router;