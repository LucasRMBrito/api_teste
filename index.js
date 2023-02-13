// config inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)

const produtoRoutes = require('./routes/produtoRoutes')
app.use('/produto', produtoRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    // mostrar req

    res.json({message: 'Oi Express - funcionou! - teste final!'})
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.3xe14db.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao MongoDB!!!')
    app.listen(3000)
})
.catch((err) => console.log(err))

