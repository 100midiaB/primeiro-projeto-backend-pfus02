const express = require("express")
const roteador = express.Router()
const produtoController = require("../controllers/produtoController")


roteador.get("/cadastrar", produtoController.formCadastroProduto)

roteador.post("/cadastrar", produtoController.salvarProduto)

roteador.get("/", produtoController.listarProdutos)

roteador.get("/:id", produtoController.buscarProduto)

roteador.put("/:id", produtoController.atualizarProduto)

roteador.delete("/:id", produtoController.deletarProduto)

module.exports = roteador