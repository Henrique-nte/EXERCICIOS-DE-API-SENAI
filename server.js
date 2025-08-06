const express = require("express"); //Importa o express

const app = express(); //Cria o servidor

const port = 3000;

const usuarios = [
    { "id": 1, "nome": "Otavio", "idade": 20, "senha": "123" },
    { "id": 2, "nome": "Admin", "idade": 20, "senha": "1234" }
]

//Request = Requisição
app.get("/", (request, response) => {
    response.send("Primeiro servidor DESI - Malwee")
});


//Buscar todos os usuários
app.get("/usuarios", (req, res) => {
    //send -> Envia os dados
    res.send(usuarios);
});


app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
