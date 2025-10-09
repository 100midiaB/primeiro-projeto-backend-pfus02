const path = require("path")
const produtoModel = require("../models/produtoModel")

module.exports = {
    
    formCadastroProduto: (req, res) => {
        return res.render("produtos/cadastroProdutos",{titulo: "cadastroProduto"})
    },

    salvarProduto: (req, res) => {
        const { produtos, nome, descricao, preco, quantidade, categoria, tipo } = req.body
       produtoNovo = produtoModel.salvar({ produtos, nome, descricao, preco, quantidade, categoria })
         res.render("produtos/confirmacaoProduto",{
            tipo: "cadastro",
            titulo: "cadastro",
            produtoNovo
         });
    },
   
    listarProdutos: (req, res) => {
        const produtos = produtoModel.listarTodos()
       res.json(produtos);
       
    },
    
    buscarProduto: (req, res) => {
        const id = req.params.id
        const produto = produtoModel.buscarPorId(id)
       
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }
        
        return res.json(produto)
    },
   
    atualizarProduto: (req, res) => {
       const id = req.params.id
       const { nome, descricao, preco, quantidade, categoria, linkdeimagem } = req.body
       const produtoAtualizado = produtoModel.atualizar(id, { nome, descricao, preco, quantidade, categoria })

        if (!produtoAtualizado) {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }
         
        return res.json({ mensagem: "Produto foi atualizado" })
    },
   
    deletarProduto: (req, res) => {
        const id = req.params.id
        const deletado = produtoModel.deletar(id)

        if (!deletado) {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }
           
        return res.json({ mensagem: "Produto foi deletado" })
    }
}