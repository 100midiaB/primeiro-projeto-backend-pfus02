//IMPORTA O MÓDULO DE PATH PARA SABER AS PASTAS E ARQUIVOS DO PROJETO
const path = require("path")

//IMPORTA TUDO QUE TEM NO MODEL
const userModel = require("../models/userModel")

module.exports = {
    //RESPONDE A REQUISIÇÃO MOSTRANDO A VISUALIZAÇÃO DA TELA DE LOGIN
    formLogin : (req,res) => { 
        res.render("login")
    },
    
    //FUNÇÃO PARA LEVAR OS DADOS PREENCHIDOS PARA O MODEL REALIZAR O LOGIN
    loginUsuario : (req,res) => {
        //CRIA UM OBJETO COM AS INFORMAÇÕES DE BODY, RETIRADOS DOS INPUTS
        const {email, senha} = req.body
        // MANDA AS INFORMAÇÕES DO OBJETO PARA O MODEL
        const logado = userModel.login(email,senha)

        //SE NÃO CONSEGUIU LOGAR, MANDA UMA MENDASAGEM DE ERRO
        if(!logado){
            return res.status(401).json({mensagem: "Usuário ou senha inválidos"})
        }
          //SE CONSEGUIU MANDA UMA MENSAGEM DE CONFIRMAÇÃO
        else{
            res.json({mensagem: "Login relaizado meu parceiro"})
          }
    }
}