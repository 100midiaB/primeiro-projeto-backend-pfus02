// IMPORTAR O JSON PARA SERVIR COMO BANCO DE DADOS

const db = require("../Data/db.json")

//VARIÁVEL PARA ARMAZENAR OS USUÁRIOS VINDOS DO DB
let listaUsuarios = db.usuarios

module.exports = {
     // LOGIN
    // FUNÇÃO PARA VÁLIDAR O LOGIN
     login : (email,senha) => {
        // BUSCA NA LISTA DE USUÁRIOS, SE TEM AQUELE USUÁRIO COM AS INFORMAÇÕES QUE ELE ME PASSOU
        let logado = listaUsuarios.find(
             (user) => user.email === email && user.senha === senha)  || null

        return logado

     },
     
     
     //CRUD
     //FUNÇÃO PARA CADASTRAR UM NOVO USUARIO
     salvar: ({usuario, email, senha, tipo}) => {
       const novoUsuario = {
          id: listaUsuarios.length + 1,
          usuario,
          email,
          senha,
          tipo
        }
        listaUsuarios.push(novoUsuario)
        console.log("Novo usuário salvo:", novoUsuario);
        return novoUsuario
        
     },
     //BUSCA TODOS OS USUARISO DO BANCO
     listarTodos: () => {
         listaUsuarios
         return listaUsuarios
     },
     //BUSCA UM USUARIO ESPECIFICO DO BANCO
     buscarPorId: (id) => {
         return listaUsuarios.find((user) => user.id == id || null) 
     },

     atualizar: (id, {usuario,email,senha}) => {
        // BUSCA NA LISTA DE USUARIOS, UM USUARIO COM AQUELE ID ESPECIFICO, SE ACHAR, PEGA O INDEX DELE E GUARDA NA VARIAVEL
          const index = listaUsuarios.findIndex((user) => user.id == id)
         // SE NÃO ACHAR, SIGNIFICA QUE UM USUARIO COM AQUELE INDEX NÃO EXISTE
        if(index === -1) return null
        // SE ACHAR UM USUARIO, SUBSTITUI AS INFORMAÇÕES QUE ESTAVAM NELE, PELAS NOVAS ENVIADAS
        listaUsuarios[index] ={
          ...listaUsuarios[index],
          listaUsuarios: usuario || listaUsuario[index].usuario,
          listaUsuarios: email || listaUsuario[index].email,
          listaUsuarios: senha || listaUsuario[index].senha,
        };
        //RETORNA O USUARIO ATUALIZADO
        return listaUsuarios[index];
     },
     deletar: (id) => {
          const index = listaUsuarios.findIndex((user) => user.id == id);
          if(index === -1) return false;
          listaUsuarios.splice(index,1);
          return true;
     },
}  