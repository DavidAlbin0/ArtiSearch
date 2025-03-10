const { gql } = require("apollo-server");

// Definición del esquema
const typeDefs = gql`
    type Usuario {
        idUsuario: Int
        Nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        Rol: Int
    }

    type Calificacion {
        usuarioID: Int
        idCalificacion: Int
        calificacion: Int
        calificaID: Int
    }

    type Query {
        obtenerArtista: [Usuario]  # Retorna una lista de usuarios
        obtenerCalificaciones: [Calificacion] # Nueva consulta para calificaciones
        obtenerUsuario: Usuario
    }
`;

module.exports = { typeDefs };
