const { gql } = require("apollo-server");

// Definición del esquema
const typeDefs = gql`

# Aqui inician los type definition 

type Usuario {
        id: ID
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        creado: String
        telefono: String
        ubicacion: String
    }

    type Artista {
        id: ID
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        creado: String
        telefono: String
        ubicacion: String
        descripcion: String
        especialidad: String
    }

    type Calificacion {
        usuarioID: Int
        idCalificacion: Int
        calificacion: Int
        calificaID: Int
    }

    type Contrato {
        usuario: String
        artista: String
        fechaInicio: String
        fechaFin: String
        detalles: String
        estado: String
        monto: String
    }

    # Aqui inician los input

    input UsuarioInput {
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        telefono: String
        password: String
    }

    input ArtistaInput {
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        telefono: String
        descripcion: String
        especialidad: String
        password: String
    }

    input ContratoInput {
        usuario: String
        artista: String
        fechaInicio: String
        fechaFin: String
        detalles: String
        estado: String
        monto: String
    }


    # Aqui inician los Mutation
    
    type Mutation {
        nuevoUsuario(input: UsuarioInput) : String
        nuevoArtista(input: ArtistaInput) : String
        nuevoContrato(input: ContratoInput) : String
    }

    type Query {
        obtenerArtista: [Usuario]  # Retorna una lista de usuarios
        obtenerCalificaciones: [Calificacion] # Nueva consulta para calificaciones
        obtenerUsuario: Usuario
    }
`;

module.exports = { typeDefs };
