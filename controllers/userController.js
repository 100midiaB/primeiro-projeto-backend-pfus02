//IMPORTA O MÓDULO DE PATH PARA SABER AS PASTAS E ARQUIVOS DO PROJETO
const path = require("path");

//IMPORTA TUDO QUE TEM NO MODEL
const userModel = require("../models/userModel");
const { render } = require("ejs");

module.exports = {
  //RESPONDE A REQUISIÇÃO MOSTRANDO A VISUALIZAÇÃO DA TELA DE LOGIN
  formLogin: (req, res) => {
    res.render("login", { titulo: "Login"});
  },

  //FUNÇÃO PARA LEVAR OS DADOS PREENCHIDOS PARA O MODEL REALIZAR O LOGIN
  loginUsuario: (req, res) => {
    //CRIA UM OBJETO COM AS INFORMAÇÕES DE BODY, RETIRADOS DOS INPUTS
    const { email, senha } = req.body;
    // MANDA AS INFORMAÇÕES DO OBJETO PARA O MODEL
    const logado = userModel.login(email, senha);

    //SE NÃO CONSEGUIU LOGAR, MANDA UMA MENDASAGEM DE ERRO
    if (!logado) {
    //   return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    res.status(401)
    res.render("login", {titulo: "login errado", erro:"Email ou senha inválidos"}) 
    
  }

    //SE CONSEGUIU MANDA UMA MENSAGEM DE CONFIRMAÇÃO
    else {
      // res.json({ mensagem: "Login relaizado meu parceiro" });
      res.status(200)
      res.render("index", {titulo: "Bem vindo", usuario: logado.nome})
    }
  },

  // CRUD
  //RESPONDE A REQUISIÇÃO MOSTRANDO A VISUALIZAÇÃO DA TELA DE CADASTRO
  formCadastro: (req, res) => {
    res.render("cadastro");
  },

  // FUNÇÃO PARA LEVAR OS DADOS PREENCHIDOS PARA O MODEL REALIZAR O CADASTRO
  salvarUsuario: (req, res) => {
    const { usuario, email, senha } = req.body;
    userModel.salvar({ usuario, email, senha });
    res.render("cadastroConfirmado");
  },

  //R
  //FUNÇÃO PARA MOSTRAR TODOS OS USUARIOS

  listarUsuarios: (req, res) => {
    const usuarios = userModel.listarTodos();
    res.json(usuarios);
    res.render("usuarios", { usuarios });
  },

  //FUNÇÃO PARA APENAS UM USUARIO
  buscarUsuario: (req, res) => {
    //BUSCA O ID VINDO DA URL COMO PARAMETRO
    const id = req.params.id;

    // GUARDA O USUÁRIO RETORNADO, DEPOIS DE BUSCAR PELO MODEL
    const usuario = userModel.buscarPorId(id);
    // SE NÃO ACHAR, AVIA QUE DEU ERRO
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    // SE ACHAR, DEVOLVE AS INFORMAÇÕES VIA JSON
    res.json(usuario);
  },
  //FUNÇÃO PARA ATUALIZAR INFORMAÇÕES DE UM USUARIO
  atualizarUsuario: (req, res) => {
    //BUSCA O ID VINDO DA URL COMO PARAMETRO
    const id = req.params.id;
    //BUSCA AS NOVAS INFORMAÇÕES PARA ATUALIZAR
    const { usuario, email, senha } = req.body;
    //GUARDA O USUARIO ATUALIZADO EM UMA VARIAVEL

    const usuarioAtualizado = userModel.atualizar(id, {
      usuario,
      email,
      senha,
    });

    // SE NÃO ACHAR, AVIA QUE DEU ERRO
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    // SE ACHAR, DEVOLVE AS INFORMAÇÕES VIA JSON
    res.json({ mensagem: "Usuario foi atualizado" });
  },
  //FUNÇÃO PARA DELETAR UM USUARIO
  deletarUsuario: (req, res) => {
    //BUSCA O ID VINDO DA URL COMO PARAMETRO
    const id = req.paramas.id;
    //GUARDA O USUARIO DELETADO EM UMA VARIAVEL
    const deletado = userModel.deletar(id);

    // SE NÃO ACHAR, AVIA QUE DEU ERRO
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    // SE ACHAR, DEVOLVE AS INFORMAÇÕES VIA JSON
    res.json({ mensagem: "Usuario foi deletado" });
  },
};
