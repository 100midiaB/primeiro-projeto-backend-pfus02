const express = require("express")


const roteador = express.Router()


const produtoController = require("../controllers/produtoController")

roteador.get("/cadastrar", produtoController.formCadastroProduto)

roteador.post("/cadastrar",produtoController.salvarProduto)

roteador.get("/", produtoController.listarProdutos)

roteador.get("/:id", produtoController.buscarProduto)


roteador.post("/:id", produtoController.atualizarProduto)


roteador.get("/deletar/:id", produtoController.deletarProduto)



module.exports = roteador