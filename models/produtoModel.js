const db = require("../Data/db.json")

let listaProdutos = db.produtos

module.exports = {

    salvar: ({ nome, descricao, preco, quantidade, categoria }) => {
        const novoProduto = {
            id: listaProdutos.length + 1,
            nome,
            descricao,
            preco,
            quantidade,
            categoria
        }
        listaProdutos.push(novoProduto)
        console.log("Novo produto salvo:", novoProduto)
        return novoProduto
    },
     
    listarTodos: () => {
        return listaProdutos
    },
     
    buscarPorId: (id) => {
        return listaProdutos.find((produto) => produto.id == id) || null
    },

    atualizar: (id, { nome, descricao, preco, quantidade, categoria }) => {
        const index = listaProdutos.findIndex((produto) => produto.id == id)
        
        if (index === -1) return null
       
        listaProdutos[index] = {
            ...listaProdutos[index],
            nome: nome || listaProdutos[index].nome,
            descricao: descricao || listaProdutos[index].descricao,
            preco: preco || listaProdutos[index].preco,
            quantidade: quantidade || listaProdutos[index].quantidade,
            categoria: categoria || listaProdutos[index].categoria,
        }
        
        return listaProdutos[index]
    },

    deletar: (id) => {
        const index = listaProdutos.findIndex((produto) => produto.id == id)
        if (index === -1) return false
        listaProdutos.splice(index, 1)
        return true
    },
}