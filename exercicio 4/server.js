const express = require("express");

const app = express();

app.listen(3000, ()=>{
    console.log("Servidor iniciado!");
});

let posts = [
    {id : 1, titulo: "Primeiro Post", conteudo: "Conteudo do primeiro post", autor: "Carlos"},
    {id : 2, titulo: "Segundo Post", conteudo: "Conteudo do segundo post", autor: "Gabriel"}
];

let comentarios = [
    {id: 1, post_id: 1, texto: "Ótimo post"}
]