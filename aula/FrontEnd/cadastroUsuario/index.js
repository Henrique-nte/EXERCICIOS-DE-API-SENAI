function cadastroUsuario(event) {
    event.preventDefault(); //Para o recarregamento da pagina quando clicarmos em cadastrar
    console.log(event);
}

// fetch('http://localhost:3000/usuarios', {

//     method: 'POST',

//     headers: {

//         'Content-Type': 'application/json'

//     },

//     body: JSON.stringify(data)

// })

//     .then(response => response.json())

//     .then(data => console.log(data))

//     .catch(error => console.log(error));