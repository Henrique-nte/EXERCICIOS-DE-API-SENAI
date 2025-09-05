fetch("http://localhost:3000/usuarios").then(res => { //async espera a informacao
    if (!res.ok) {
        throw new Error("Erro na requisição");
    }

    return res.json();

}).then(usuarios => {

    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {

        listaUsuarios.innerHTML +=

            `<li class="list-group-item">
            <div class="d-flex justify-content-between">
                <h5>Nome: ${usuario.nome} - Idade: ${usuario.idade}</h5>

                <div>
                <a href = "editarUsuario/index.html?id=${usuario.id}" class="btn btn-primary">Atualizar</a>
                <button type="button" class="btn btn-danger" onclick="deletarUsuario(${usuario.id})">Deletar</button>
                </div>


            </div>
            </li>
            `;

    });

}).catch(err => {
    console.error(err);
});



//Função para deletar usuário
function deletarUsuario(userId) {
    let confirmar = confirm("Você realmente deseja excluir o usuário " + userId + "?");


    if (confirmar) {
        fetch(`http://localhost:3000/usuarios/${userId}`, {

            method: 'DELETE',

        })

            .then(response => {
                if (response.ok) {
                    alert("Usuário " + userId + "excluido com sucesso!");
                    window.location.reload();
                    return;
                }

                alert("Algo deu errado!");
            })

            .catch(error => console.log(error));

    }

}
