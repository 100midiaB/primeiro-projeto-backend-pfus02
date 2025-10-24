const path = require("path");
const userModel = require("../models/userModel");

module.exports = {
  formLogin: (req, res) => {
    res.render("login", { titulo: "Login" });
  },

  loginUsuario: (req, res) => {
    const { email, senha } = req.body;
    const logado = userModel.login(email, senha);

    if (!logado) {
      res.status(401);
      return res.render("login", {
        titulo: "Erro no Login",
        erro: "Email ou senha inválidos"
      });
    }

    res.status(200);
    res.render("index", { titulo: "Bem-vindo", usuario: logado.nome });
  },

  formCadastro: (req, res) => {
    res.render("usuarios/cadastroUsuarios", { titulo: "Cadastro" });
  },

  salvarUsuario: (req, res) => {
    const { usuario, email, senha, tipo } = req.body;
    const usuarioNovo = userModel.salvar({ usuario, email, senha, tipo });
    res.render("usuarios/confirmacaoUsuarios", {
      tipo: "cadastro",
      titulo: "Cadastro Confirmado",
      usuarioNovo
    });
  },

  listarUsuarios: (req, res) => {
    const usuarios = userModel.listarTodos();
    res.render("usuarios/listaUsuarios", {
      usuarios,
      titulo: "Lista de Usuários"
    });
  },

  buscarUsuario: (req, res) => {
    const id = req.params.id;
    const usuario = userModel.buscarPorId(id);

    if (!usuario) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Usuário não encontrado"
      });
    }

    res.render("usuarios/editarUsuarios", {
      titulo: "Editar Usuário",
      usuario
    });
  },

  atualizarUsuario: (req, res) => {
    const id = req.params.id;
    const { usuario, email, senha } = req.body;

    const usuarioAtualizado = userModel.atualizar(id, {
      usuario,
      email,
      senha,
    });

    if (!usuarioAtualizado) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Não foi possível atualizar o usuário"
      });
    }

    res.render("usuarios/confirmacaoUsuarios", {
      titulo: "Edição Confirmada",
      tipo: "edicao",
      usuarioAtualizado
    });
  },

  deletarUsuario: (req, res) => {
    const id = req.params.id;
    const deletado = userModel.deletar(id);

    
    if (!deletado) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Não foi possível deletar o usuário"
      });
    }

    res.render("usuarios/confirmacaoUsuarios", {
      titulo: "Usuário Deletado",
      tipo: "deletar",
      deletado
    });
  }
};