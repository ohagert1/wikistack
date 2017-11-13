const express = require('express');
const Wiki = express.Router();
const models = require('../models/index');

Wiki.get('/', (req, res) => {
  res.redirect('/');
});

Wiki.post('/', (req, res) => {
  const article = res.json(req.body);
});

Wiki.get('/add', (req, res) => {
  // res.send('this is a wiki add page');
  res.render('addpage');
});

Wiki.get('/:article', (req, res) => {
  const article = req.params.article;
  models.Page.findAll({
    where: {
      urlTitle: article
    }
  })
  .then((data) => {
    res.send('success');
  })
  .catch(() => res.status(404).send('404, not found'));
});


module.exports = Wiki;
