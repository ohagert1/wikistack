'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models/index');
const wikiRouter = require('./wiki');
const userRouter = require('./users');

module.exports = router;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  models.Page.findAll({})
  .then((pages) => {
    res.render('index', {pages: pages});
  });

});


