const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

let tarefas = [
    { id: 1, titulo: "Estudar express", concluida: false },
    { id: 2, titulo: "Fazer exercícios", concluida: false },
];

//let nextId = 1;

//READ All (GET): Crie uma rota GET /tarefas que retorne todas as tarefas.
app.get("/tarefas", (request, response) => {
    response.send(tarefas);
});

//READ One (GET): Crie uma rota GET /tarefas/:id que retorne uma única tarefa com base no seu id. 
//Se a tarefa não for encontrada, retorne o status 404 com uma mensagem de erro.
app.get("/tarefas/:id", (req, resp) =>{
    const id = Number(req.params.id);

    const tarefas = tarefas.find(tarefa => tarefa.id == id);

    if (tarefas != null){
        resp.send(tarefas)
    } else{
        resp.status(404).send("Tarefa não encontrada.")
    }

});