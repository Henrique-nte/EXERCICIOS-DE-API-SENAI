const express = require("express");

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log("Iniciando servidor em http://localhost:3000");
});

app.use(express.json());

const produtos = [
    { id: 1, nome: "Teclado", preco: 350.00, emEstoque: true },
    { id: 2, nome: "Mouse", preco: 180.00, emEstoque: true },
    { id: 3, nome: "Monitor", preco: 1500.00, emEstoque: false },
]

//Listar Produtos em Estoque (GET): Crie uma rota GET /produtos/em-estoque
//que retorne apenas os produtos onde emEstoque for true.


app.get("/produtos/emEstoque", (req, resp) => {
    
    resp.send(produtos);


});