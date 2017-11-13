var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack'
  ,{logging: false}
);

const Page = db.define('page', {
  title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING, allowNull: false, isUrl: true},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM('open', 'closed') /*default value??*/ },
}, {
  hooks: {
    beforeValidate: (page) => {
    page.urlTitle = page.title.replace(/\s+/g, '_', '_').replace(/\W/g, '');
  }
  }
});

const User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, isEmail: true}
});

Page.belongsTo(User, { as: 'author'});

module.exports = {
  db: db,
  Page: Page,
  User: User
};


