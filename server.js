const express = require("express"); //Importa o express

const app = express(); //Cria o servidor

const port = 3000;

//Para permitir receber json nas requisições
app.use(express.json());

//Array de usuários
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

//Buscar um usuário -> get by id
app.get("/usuarios:/id", (req, res) => {
    const id = parseInt(req.params.id)

    const users = usuarios.find(usuario => usuario.id == id);

    if (users != null) {
        res.send(usuarios)
    } else {
        res.status(404).send("Usuario não encontrado.")
    }

});



app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
