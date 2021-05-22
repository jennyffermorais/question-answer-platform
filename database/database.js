const Sequelize = require('sequelize');

const connection = new Sequelize(
   process.env.DATABASE,
   process.env.DBLOGIN,
   process.env.DBPASSWORD,
   {
      host: process.env.HOST,
      dialect: 'mysql',
   }
);

module.exports = connection;
