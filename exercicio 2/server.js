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


app.get("/produtos/em-estoque", (req, resp) => {

    //Com Filter
    //const produtosEmEstoque = produtos.filter(produto => produto.emEstoque);
    //resp.send(produtosEmEstoque);

    const produtos_EmEstoque = []

    for(let i = 0; i < produtos.length;i++){
        if (produtos[i].emEstoque){
            produtos_EmEstoque.push(produtos[i]);
        }
    }

    resp.send(produtos_EmEstoque);

    
    
    
});

//Pesquisar Produto por Nome (GET): Crie uma rota GET /produtos/pesquisar que receba um parâmetro de consulta (query parameter) chamado nome.
//A rota deve retornar uma lista de produtos que contenham o texto da pesquisa no nome (a pesquisa deve ser case-insensitive).
//Exemplo de requisição: GET /produtos/pesquisar?nome=mouse

app.get("/produtos/pesquisar", (req, resp) =>{

    const nome = req.query.nome;

    const produtoComNome = produtos.filter(produto => produto.nome.toLocaleLowerCase() == nome.toLocaleLowerCase());

    resp.send(produtoComNome);

});


//Atualizar Preço (PATCH): Crie uma rota PATCH /produtos/:id que receba um id e um novo preco no corpo da requisição.
//Atualize apenas o preço do produto correspondente.
//Dica: PATCH é usado para atualização parcial, enquanto PUT é para substituição completa.

app.patch("/produtos/:id", (req, resp) =>{

    const id = parseInt(req.params.id);
    const novoPreco = req.body.preco;

    if(!novoPreco){
        resp.status(400).send("Informe um novo preco");
    }

    const produto = produtos.find(produto => produto.id === id);

    if(!produto){
        resp.status(404).send("Produto nao encontrado.");
    }

    produto.preco = novoPreco;
    resp.status(200).send(produto);

});

//Adicionar a Categoria (PUT): Crie uma rota PUT /produtos/:id que receba um id e um objeto de produto
//completo no corpo da requisição. O novo produto pode ter uma propriedade categoria. Substitua o 
//produto antigo pelo novo. Se a propriedade categoria não existir, retorne um erro 400 (Bad Request).

app.put("/produtos/:id", (req, resp) =>{
    const id = parseInt(req.params.id);
    const produtoCorpo = req.body;

    const categoriasPermitidas = ["Perifericos", "Monitores", "Componentes"];
    //
    for(let i = 0;i < categoriasPermitidas.length;i++){
        if(produtoCorpo.categoria != categoriasPermitidas[i]){
            resp.status(400).send("Categoria invalida!");
            break;
        }
    }
    

    if(!produtoCorpo){
        resp.status(400).send("Informe um produto!");
    }

    const produto = produtos.find(produto => produto.id == id);

    if(!produto){
        resp.status(400).send("Informe um produto");
    }

    produto.nome = produtoCorpo.nome; 
    produto.preco = produtoCorpo.preco; 
    produto.emEstoque = produtoCorpo.emEstoque; 

    //Adicionar categoria
    produto.categoria = produtoCorpo.categoria;

    resp.status(200).send(produto);

});