//IMPORTANDO O MÓDULO EXPRESS
const express = require("express")

//CRIANDO UMA VARIÁVEL PARA GERENCIAR AS ROTAS DE USUÁRIO
const roteador = express.Router()

//IMPORTANDO TUDO QUE TEM NO ARQUIVO DE CONTROLLER DO USUÁRIO
const userController = require("../controllers/userController")

//LOGIN
//ROTA PARA SOLICITAR A PÁGINA DE LOGIN
roteador.get("/login", userController.formLogin)
//ROTA PARA ENVIAR DADOS NA PÁGINA DE LOGIN
roteador.post("/login", userController.loginUsuario)

//CRIANDO A EXPORTAÇÃO DESSE ARQUIVO
module.exports = roteador