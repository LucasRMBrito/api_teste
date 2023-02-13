const router = require('express').Router();
const Produto = require('../models/Produto');


// Create - criação de dados
router.post('/', async (req, res) => {

    //req.body
    // {name: "Lucas", salary: 5000, approved: false}
    const {nome, preco} = req.body

    if(!nome) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    const produto = {
        nome,
        preco
    }

    try {
        //criando dados
        await Produto.create(produto)

        res.status(201).json({messge: 'Produto inserido com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const produto = await Produto.find()

        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const produto = await Produto.findOne({_id: id})

        if(!produto) {
            res.status(422).json({message: 'Produto não encontrado!!!'})
            return
        }

        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// Update - atualização de dados ( PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id= req.params.id

    const {nome, preco} = req.body

    const produto = {
        nome,
        preco
    }

    try {
        const atualizarProduto = await Produto.updateOne({_id: id}, produto)

        if(atualizarProduto.matchedCount === 0) {
            res.status(422).json({message: 'Produto não encontrado!!!'})
            return
        }

        res.status(200).json(produto)
    } catch(error) {
        res.status(500).json({error:error})
    }
})

//Delete- deletar dados
router.delete('/:id', async (req, res) => {
    const id =req.params.id

    const produto = await Produto.findOne({_id: id})

    if(!produto) {
        res.status(422).json({message: 'Produto não encontrado!!!'})
        return
    }

    try {

        await Produto.deleteOne({_id: id})

        res.status(200).json({message: "Produto removido com sucesso!!!"})
    } catch(error) {
        res.status(500).json({error:error})
    }
})

module.exports = router
