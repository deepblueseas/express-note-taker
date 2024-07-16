
const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

router.use('/api/notes', apiRoutes);
router.use('/notes', htmlRoutes);

module.exports = router;