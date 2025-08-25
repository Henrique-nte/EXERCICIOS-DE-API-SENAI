fetch("http://localhost:3000/usuarios").then(res => {
    if (!res.ok) {
        throw new Error("Erro na requisição");
    }

    console.log(res);
}).catch(err => {
    console.error(err);
});