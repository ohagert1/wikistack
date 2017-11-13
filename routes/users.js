const express = require('express');
const User = express.Router();
const models = require('../models/index');

module.exports = User;

User.get('/', (req, res) => {
  models.User.findAll({})
  .then((users) => {
    res.render('users', {users: users});
  });
});

User.get('/:id', (req, res) => {
  models.Page.findAll({
    where: {
      authorId: req.params.id
    }
  })
  .then((pages) => {
    res.render('index', {pages: pages});
  });
});
