'use strict';

const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./routes/index');
const models = require('./models/index');


app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(router);
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true});

models.db.sync()
  .then(function() {
    app.listen(3000, function() {
      console.log(chalk.green('server online, port 3000'));
    });
  })
  .catch(chalk.red(console.error));
