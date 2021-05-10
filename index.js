const express = require('express');
const app = express();

//define o renderizador de html
app.set('view engine', 'ejs');
//possibilita o uso de arquivos estáticos
app.use(express.static('public'))

app.get('/', (req, res) => {
   //o render olha dentro da pasta views
   res.render('index');
});

app.get('/question', (req, res) => {
    res.render('question')
})

app.listen(3300, () => {
   console.log('App rodando!');
});
