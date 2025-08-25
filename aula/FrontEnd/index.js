fetch("http://localhost:3000/usuarios").then(async res => { //async espera a informacao
    if (!res.ok) {
        throw new Error("Erro na requisição");
    }

    return res.json();

}).then(usuarios => {

    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {
        console.log(usuario);
    });

}).catch(err => {
    console.error(err);
});