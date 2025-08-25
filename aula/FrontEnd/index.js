fetch("http://localhost:3000/usuarios").then(res => { //async espera a informacao
    if (!res.ok) {
        throw new Error("Erro na requisição");
    }

    return res.json();

}).then(usuarios => {

    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {

        listaUsuarios.innerHTML += `<li class="list-group-item">${usuario.nome}</li>`;

    });

}).catch(err => {
    console.error(err);
});