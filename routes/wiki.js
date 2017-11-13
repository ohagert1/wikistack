const express = require('express');
const Wiki = express.Router();
const models = require('../models/index');
const chalk = require('chalk');

Wiki.get('/', (req, res) => {
  res.redirect('/');
});



Wiki.post('/', (req, res) => {
  // const article = res.json(req.body);

models.User.findOrCreate({
  where: {
    name: req.body['author'],
    email: req.body['author-email']
  }
})
  .then((values) => {
    let user = values[0];
    let page = models.Page.build({
      title: req.body['page-title'],
      urlTitle: '',
      content : req.body['page-content'],
      status: req.body['page-status']
    });
    return page.save().then((page) => {
      return page.setAuthor(user);
    });
  })
  .then((page) => {
    res.redirect(page.urlTitle);
  }).catch();


});

Wiki.get('/add', (req, res) => {
  res.render('addpage');
});


Wiki.get('/:articleUrl', (req, res) => {
  const articleUrl = req.params.articleUrl;
  models.Page.findOne({
    where: {
      urlTitle: articleUrl
    }
  })
  .then((page) => {
    let author = models.User.findOne({
      where: {
        id: page.authorId
      }
    });
    return {page: page, author: author};
  })
  .then((page) => {
    console.log(Object.keys(page.author));
    console.log(chalk.red(page));
    res.render('wikipage', page);
  })
  .catch(() => res.status(404).send('404, not found'));
});



module.exports = Wiki;
