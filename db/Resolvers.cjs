const resolvers = {
    Query: {
        obtenerArtista: () => "Algo",

        obtenerCalificaciones: () => "Algo",

        obtenerUsuario: () => "Algo"
    },
    Mutation: {
        nuevoUsuario: (_, { input }) => {
            console.log(input);

            return"Creando ..."
        },
        nuevoArtista: (_, { input }) => {
            console.log(input);

            return"Creando Perfil de artista ..."
        },
        nuevoContrato: (_, { input }) => {
            console.log(input);

            return"Creando Contrato ..."
        }
    }
};

module.exports = { resolvers };
