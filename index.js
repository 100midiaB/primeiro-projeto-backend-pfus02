const express = require('express')

const app = express()

const port = 5000

const path = require('path')
const caminho = path.join(__dirname, "views")


//IMPORTAÇÕES
//IMPORTA AS ROTAS DE USUÁRIO
const userRoutes = require("./routes/userRoutes")

//INTERPRETADOR DE JSON, PARA TRATAR AS INFORMAÇÕES DO BODY
app.use(express.urlencoded({extended:true} ))
app.use(express.json())


//CRIA UMA ROTA PRICIPAL PARA AS SUB ROTAS DE USUÁRIO
app.use("/usuarios", userRoutes)

//DEFININDO O EJS COMO TEMPLE ENGINE
app.set('view engine', 'ejs')

//DIFININDO 'ATALHO' ONDE BUSCAR AS VIEWS
app.set("views",path.join(__dirname, "views"))

//ROTA DE PÁGINA INICIAL
app.get("/home", (req,res) => {
    res.status(200)
    res.render("index")
})

//ROTA PRA QUANDO TENTAR ACESSAR UMA ROTA QUE NÃO EXISTE
app.use((req,res) => {
    res.status(404)
    res.render("404")
})
//ROTA INICIAL DO PROJETO
app.get("/",(req,res)  => {
    res.status(200).send("Olá, parabéns conseguiu")
})
//SUBIR O SERVIDOR
app.listen(port, () => {
    console.log(`Servidor funcionando em http://localhost:${port}`)
})
