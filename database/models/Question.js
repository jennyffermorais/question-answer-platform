const Sequelize = require('sequelize');
const connection = require('../database');

const Question = connection.define('questions', {
   title: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   question: {
      type: Sequelize.TEXT,
      allowNull: false,
   },
});

// se não existir no banco, ele cria a tabela
Question.sync({ force: false }).then(() => {
   console.log('***** Tabela questions criada com sucesso! *****');
});

module.exports = Question;