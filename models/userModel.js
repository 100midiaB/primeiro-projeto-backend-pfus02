// IMPORTAR O JSON PARA SERVIR COMO BANCO DE DADOS
const db = require("../Data/db.json")

//VARIÁVEL PARA ARMAZENAR OS USUÁRIOS VINDOS DO DB
let listaUsuarios = db.usuarios

module.exports = {
     // LOGIN
    // FUNÇÃO PARA VÁLIDAR O LOGIN
     login : (usuario,senha) => {
        // BUSCA NA LISTA DE USUÁRIOS, SE TEM AQUELE USUÁRIO COM AS INFORMAÇÕES QUE ELE ME PASSOU
        let logado = listaUsuarios.find(
             (user) => {user.email === usuario && user.senha === senha})  || null

        return logado

     }
}