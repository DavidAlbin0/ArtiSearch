const resolvers = {
    Query: {
        obtenerArtista: () => [
            {
                idArtista: 1,
                Nombre: "Juan",
                apellidoP: "Pérez",
                apellidoM: "Gómez",
                genero: "Masculino",
                Rol: 2
            }
        ],
        obtenerCalificaciones: () => [
            {
                artistaID: 1,
                idCalificacion: 5,
                calificacion: 10,
                calificaID: 2
            }
        ],
        obtenerUsuario: () => ({
            idArtista: 2,
            Nombre: "Maria",
            apellidoP: "Lopez",
            apellidoM: "Santos",
            genero: "Femenino",
            Rol: 1
        })
    }
};

module.exports = { resolvers };
