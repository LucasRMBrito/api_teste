const mongoose = require('mongoose');

const Produto = mongoose.model('Produto', {
    nome: String,
    preco: Number,
})

module.exports = Produto