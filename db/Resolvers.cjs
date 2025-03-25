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
        },
        nuevaCalificacion: (_, { input }) => {
            console.log(input);

            return"Publicando Calificacion ..."
        },
        
        nuevoPago: (_, { input }) => {
            console.log(input);

            return"Procesando Pago ..."
        },
        nuevoPost: (_, { input }) => {
            console.log(input);

            return"Publicando post ..."
        }
    }
};

module.exports = { resolvers };
