const Sequelize = require('sequelize');

const connection = new Sequelize(
   process.env.DATABASE,
   process.env.DBLOGIN,
   process.env.DBPASSWORD,
   {
      host: process.env.HOST,
      port: process.env.PORT,
      dialect: 'mysql',
   }
);

module.exports = connection;
