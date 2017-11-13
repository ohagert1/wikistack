'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models/index');
const wikiRouter = require('./wiki');
const userRouter = require('./user');

module.exports = router;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.send('all good');
});


