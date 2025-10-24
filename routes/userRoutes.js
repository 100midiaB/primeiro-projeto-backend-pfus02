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

//CRUD 

//C = CRIAR NOVO USUÁRIO
//ROTA PARA SOLICITAR A PÁGINA DO CADASTRO
roteador.get("/cadastrar", userController.formCadastro)
//ROTA PARA ENVIAR DADOS DE CADSTRO
roteador.post("/cadastrar", userController.salvarUsuario)


// R = OBTER INFORMAÇÕES USUÁRIOS
// RETORNA AS INFORMAÇÕES DE TODOS OS USUARIOS
roteador.get("/", userController.listarUsuarios)
// RETORNA AS INFORMAÇÕES DE UM USUARIO APENAS
roteador.get("/:id", userController.buscarUsuario)

// U = ATUALIZAR UM USUARIO
roteador.post("/:id", userController.atualizarUsuario)

// D = DELETAR UM USUARIO
roteador.get("/deletar/:id", userController.deletarUsuario)


//CRIANDO A EXPORTAÇÃO DESSE ARQUIVO
module.exports = roteador