const express = require("express");

const app = express();

app.listen(3000, ()=>{
    console.log("Servidor iniciado!");
});

app.use(express.json());

const posts = [
    {id : 1, titulo: "Primeiro Post", conteudo: "Conteudo do primeiro post", autor: "Carlos"},
    {id : 2, titulo: "Segundo Post", conteudo: "Conteudo do segundo post", autor: "Gabriel"}
];

const comentarios = [
    {id: 1, post_id: 1, texto: "Otimo post", autor: "Henrique"},
    {id: 2, post_id: 2, texto: "Post ruim", autor: "Mirella"},
    {id: 3, post_id: 1, texto: "Amei", autor: "Juliana"}

];

app.get("/posts", (req, resp) =>{
    resp.send(posts);
});
app.get("/comentarios", (req, resp) =>{
    resp.send(comentarios);   
});



//Listar Comentários de um Post (GET): Crie uma rota GET /posts/:id/comentarios
//que retorne todos os comentários de um post específico.
//O id na URL refere-se ao id do post.
//Você deve filtrar o array comentarios para encontrar todos que tenham o post_id correspondente.

app.get("/posts/:id/comentarios", (req, resp) =>{
    const id = req.params.id;

    const comentariosPost = comentarios.filter(comentario => comentario.post_id == id);

    

    if(comentariosPost != ""){
        resp.status(200).send(comentariosPost);
    }
    
    resp.status(404).send("Esse comentario nao existe");
    
});


//Adicionar Comentário a um Post (POST): Crie uma rota POST /posts/:id/comentarios que receba um
//id de post e um objeto de comentário ({ texto: "..." }) no corpo da requisição.
//Crie um novo id para o comentário.
//Use o id do post da URL para atribuir o post_id ao novo comentário.
//Adicione o novo comentário ao array e retorne-o com status 201.

let nextId = 4;

app.post("/posts/:id/comentarios", (req, resp) =>{
    const id = req.params.id;
    const novoComentario = req.body;
    
    if(!novoComentario.texto || !novoComentario.autor){
        resp.status(404).send("Sem corpo de comentario");
    }
    
    const idNovo = nextId ++;
    novoComentario.id = idNovo;
    novoComentario.post_id = id;

    comentarios.push(novoComentario);
    resp.status(201).send(novoComentario);
});

// Deletar um Comentário (DELETE): Crie uma rota DELETE /comentarios/:id para
// remover um comentário específico.
// Diferente das outras, esta rota não precisa do id do post.

app.delete("/comentarios/:id", (req, resp) =>{

    const id = parseInt(req.params.id);

    const index = comentarios.findIndex(comentario => comentario.id == id);

    if (index >= 0) {
        comentarios.splice(index, 1);
        resp.status(200).send(`Comentario com id: ${id} removido com sucesso!`);
    } else {
        resp.status(404).send("Comentario nao encontrado.");
    }

}); 
