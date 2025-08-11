const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

app.use(express.json());


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
    const id = parseInt(req.params.id);

    const tasks = tarefas.find(tarefa => tarefa.id == id);

    if (tasks != null){
        resp.send(tasks)
    } else{
        resp.status(404).send("Tarefa não encontrada.")
    }

});

//CREATE (POST): Crie uma rota POST /tarefas que receba um novo objeto 
//de tarefa no corpo da requisição e o adicione à lista.
// Use sua lógica de ID para atribuir um id único e seguro.
// Retorne a nova tarefa criada com o status 201.

//A melhor abordagem é ter uma variável separada (let nextId = ...) 
//que rastreie o próximo ID a ser usado. Lembre-se de inicializar
//essa variável corretamente e de incrementá-la a cada nova tarefa criada.

function validarId(maiorId, array){
    if(maiorId + 1 == array[array.length - 1].id){
        return false
    }
    return true
}

app.post("/tarefas", (req, res) => {
    let maiorId = 0;
    
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id > maiorId) {
            maiorId = tarefas[i].id;
        }
    }

    const novaTarefa = req.body;
    let validar = validarId(maiorId, tarefas);

    if (validar) {
        novaTarefa.id = maiorId + 1;
    }
    
    tarefas.push(novaTarefa);
    res.send(novaTarefa);
});

//UPDATE (PUT): Crie uma rota PUT /tarefas/:id que receba um id e um objeto de tarefa no corpo 
//da requisição. Atualize a tarefa correspondente com os novos dados. Retorne a tarefa atualizada.
//Se a tarefa não for encontrada, retorne o status 404.

app.put("/tarefas/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const novaTarefa = req.body;
    novaTarefa.id = id;

    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (index != null) {
        tarefas[index] = novaTarefa;
        res.status(204).send(novaTarefa)
    } else {
        res.status(404).send("Tarefa não encontrada.")
    }


});

//DELETE (DELETE): Crie uma rota DELETE /tarefas/:id que remova a tarefa com o
//id correspondente. Se a remoção for bem-sucedida, retorne o status 204. 
//Se a tarefa não for encontrada, retorne o status 404.
app.delete("/tarefas/:id", (req, resp) =>{
    const id =  parseInt(req.params.id);
    const index = tarefas.findIndex(tarefa => tarefa.id == id);

    if (index != null){
        tarefas.splice(index, 1);
        resp.status(204).send(`Tarefa com id: ${id} removido com sucesso!`);
    }else{
        resp.status(404).send("Usuário não encontrado.")
    }
});