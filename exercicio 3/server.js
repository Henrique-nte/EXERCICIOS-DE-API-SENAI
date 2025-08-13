const express = require("express");

const app = express();

const port = 3000;

app.listen(port, () =>{
    console.log("Servidor iniciado.");
});

app.use(express.json());

const posts = [
    {id : 1, titulo: "Primeiro Post", conteudo: "Conteudo do primeiro post", autor: "Carlos"},
    {id : 2, titulo: "Segundo Post", conteudo: "Conteudo do segundo post", autor: "Gabriel"}
];

app.get("/posts", (req, resp) =>{
    resp.send(posts);
});

//Criar Post com Validação (POST): Crie uma rota POST /posts que receba um novo post.
//Validação: Antes de adicionar o post, verifique se as propriedades titulo, conteudo e autor existem e não estão vazias.
//Se a validação falhar, retorne o status 400 (Bad Request) com uma mensagem de erro clara.
//Se a validação for bem-sucedida, adicione o post à lista, gere um novo id e retorne o post criado com o status 201.

let idAtual = 3;

app.post("/posts", (req, resp) =>{
    
    const novoPost = req.body;
    
    //Validação: Antes de adicionar o post, verifique se as propriedades titulo, conteudo e autor existem e não estão vazias.
    if(!novoPost.titulo || !novoPost.conteudo || !novoPost.autor){
        //Se a validação falhar, retorne o status 400 (Bad Request) com uma mensagem de erro clara.
        resp.status(400).send("Alguns dos campos esta vazio!");
    }

    //Se a validação for bem-sucedida, adicione o post à lista, gere um novo id e retorne o post criado com o status 201.

    novoPost.id = idAtual++;

    posts.push(novoPost);
    resp.status(201).send(novoPost);
});

//
//Buscar Posts por Autor (GET): Crie uma rota GET /posts/autor/:autor que retorne todos os posts de um autor específico.
//A busca deve ser case-insensitive (não diferenciar maiúsculas de minúsculas).
//Dica: Você pode usar o método .filter() para percorrer o array.

app.get("/posts/autor/:autor", (req, resp) =>{
    const nomeAutor = req.params.autor;

    const autor = posts.find(post => post.autor.toLocaleLowerCase() == nomeAutor.toLocaleLowerCase());

    if(!autor){
        resp.status(400).send("Autor nao encontrado");
    }

    resp.status(201).send(autor);
});

//
//Atualizar Conteúdo de um Post (PATCH): Crie uma rota PATCH /posts/:id que receba um id e 
//um novo conteudo no corpo da requisição. Atualize apenas o conteúdo do post correspondente.
//Se o post não for encontrado, retorne 404.
//Se o novo conteudo não for fornecido, retorne 400.

app.patch("/posts/:id", (req, resp) =>{
    const id = req.params.id;
    const conteudoCorpo = req.body;

    const post = posts.find(post => post.id == id);


    post.titulo = conteudoCorpo.titulo;
    post.conteudo = conteudoCorpo.conteudo;
    post.autor = conteudoCorpo.autor;

    resp.status(201).send(conteudoCorpo);
});