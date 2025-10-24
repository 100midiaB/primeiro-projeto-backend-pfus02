// IMPORTAR O JSON PARA SERVIR COMO BANCO DE DADOS
const db = require("../Data/db.json")

// VARIÁVEL PARA ARMAZENAR OS USUÁRIOS VINDOS DO DB
let listaUsuarios = db.usuarios

module.exports = {
  // LOGIN
  login: (email, senha) => {
    // Procura o usuário com email e senha correspondentes
    const logado =
      listaUsuarios.find(
        (user) => user.email === email && user.senha === senha
      ) || null
    return logado
  },

  // CRUD

  // Criar novo usuário
  salvar: ({ usuario, email, senha, tipo }) => {
    const novoUsuario = {
      id: listaUsuarios.length + 1,
      usuario,
      email,
      senha,
      tipo,
    }
    listaUsuarios.push(novoUsuario)
    console.log("Novo usuário salvo:", novoUsuario)
    return novoUsuario
  },

  // Listar todos os usuários
  listarTodos: () => {
    return listaUsuarios
  },

  // Buscar usuário por ID
  buscarPorId: (id) => {
    return listaUsuarios.find((user) => user.id == id) || null
  },

  // Atualizar usuário
  atualizar: (id, { usuario, email, senha, tipo }) => {
    const index = listaUsuarios.findIndex((user) => user.id == id)
    if (index === -1) return null

    listaUsuarios[index] = {
      ...listaUsuarios[index],
      usuario: usuario || listaUsuarios[index].usuario,
      email: email || listaUsuarios[index].email,
      senha: senha || listaUsuarios[index].senha,
      tipo: tipo || listaUsuarios[index].tipo,
    }

    return listaUsuarios[index]
  },

  // Deletar usuário
  deletar: (id) => {
    const index = listaUsuarios.findIndex((user) => user.id == id)
    if (index === -1) return false
    listaUsuarios.splice(index, 1)
    return true
  },
}
