const express = require("express"); //Importa o express
const cors = require("cors");

const app = express(); //Cria o servidor

const port = 3000;

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

//Array de usuários
const usuarios = [
    { "id": 1, "nome": "Machado de Assis", "idade": 20, "senha": "123" },
    { "id": 2, "nome": "Carlos Drummond ", "idade": 20, "senha": "1234" },
    { "id": 3, "nome": "Clarice Lispector", "idade": 20, "senha": "1234" },
    { "id": 4, "nome": "Fernado Pessoa", "idade": 20, "senha": "1234" },
];

let nextId = 5;
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
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const users = usuarios.find(usuario => usuario.id == id);

    if (users != null) {
        res.send(usuarios)
    } else {
        res.status(404).send("Usuario não encontrado.")
    }

});


//Criar um usuário
app.post("/usuarios", (req, res) => {
    //body - corpo da requisição
    const novoUsuario = req.body
    novoUsuario.id = nextId++;

    usuarios.push(novoUsuario)

    res.status(201).send(novoUsuario)
});


//Atualizar usuário
app.put("/usuarios", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    novoUsuario.id = id;
    const index = usuarios.findIndex(usuario => usuario.id == id);


    if (index != null) {
        usuarios[index] = novoUsuario;
        res.status(200).send(novoUsuario)
    } else {
        res.status(404).send("Usuário não encontrado.")
    }

});

//Deletar um usuário
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {
        usuarios.splice(index, 1);
        res.status(204).send("Usuario com id:", + id + "removido com sucesso.")
    } else {
        res.status(404).send("Usuário não encontrado.")
    }
});


app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
