const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV == 'development') {
   dotenv.config({ path: __dirname + '/.env' });
}

const connection = require('./database/database');

/**
 * Database
 * */
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

app.get('/', (req, res) => {
   //o render olha dentro da pasta views
   res.render('index');
});

app.get('/question', (req, res) => {
   res.render('question');
});

app.post('/savequestion', (req, res) => {
   var title = req.body.title;
   var question = req.body.question;

   res.send(`Form: TITLE ${title} | QUESTION ${question}`);
});

app.listen(3300, () => {
   console.log('***** App rodando! *****');
});
