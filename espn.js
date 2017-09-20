const express = require('express');

const football = require('./espn-football');

const router = express.Router();

router.use('/football', football);

module.exports = router;
