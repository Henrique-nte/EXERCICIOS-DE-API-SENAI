const express = require("express"); //Importa o express

const app = express(); //Cria o servidor

const port = 3000;

//Request = Requisição

app.get("/", (request, response) => {
    response.send("Primeiro servidor DESI - Malwee")
});

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000")
});

