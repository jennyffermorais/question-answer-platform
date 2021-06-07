const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV == 'development') {
   dotenv.config({ path: __dirname + '/.env' });
}

/**
 * Database
 * */
const connection = require('./database/database');
const Question = require('./database/models/Question');
const Answer = require('./database/models/Answer');

connection
   .authenticate()
   .then(() => {
      console.log('***** Database conected! *****');
   })
   .catch((erro) => {
      console.log(erro);
   });

//define o renderizador de html
app.set('view engine', 'ejs');

//possibilita o uso de arquivos estáticos
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Routes
 * */
app.get('/', (req, res) => {
   // SELECT ALL
   Question.findAll({ raw: true, order: [['id', 'DESC']] })
      .then((questions) => {
         console.log(questions);

         //o render olha dentro da pasta views
         res.render('index', {
            questions: questions,
         });
      })
      .catch((erro) => {
         console.log(erro);
      });
});

app.get('/question', (req, res) => {
   res.render('question');
});

app.post('/savequestion', (req, res) => {
   var title = req.body.title;
   var question = req.body.question;

   // INSERT
   Question.create({
      title: title,
      question: question,
   })
      .then(() => {
         // após enviar a pergunta, volta para a home
         res.redirect('/');
      })
      .catch((erro) => {
         console.log(erro);
      });
});

app.get('/question/:id', (req, res) => {
   const id = req.params.id;

   Question.findOne({
      where: { id: id },
   }).then((question) => {
      if (question != undefined) {
         res.render('questionPage', {
            question: question,
         });
      } else {
         res.redirect('/');
      }
   });
});

app.listen(3300, () => {
   console.log('***** App rodando! *****');
});
