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
        id: ID
        usuario: String
        artista: String
        calificacion: String
        comentario: String
    }

    type Contrato {
        id: ID
        usuario: String
        artista: String
        fechaInicio: String
        fechaFin: String
        detalles: String
        estado: String
        monto: String
    }

    type Post{
        id: ID
        artista: String
        titulo: String
        descripcion: String
        imagen: String
        fechaPublicacion: String
        ubicacion: String
    }

    type Pago{
        id: ID
        contrato: String
        usuario: String
        artista: String
        monto: String
        metodoPago: String
        estado: String
        fechaPago: String
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


    input CalificacionInput {
        usuario: String
        artista: String
        calificacion: String
        comentario: String
    }

    input PostInput {
        artista: String
        titulo: String
        descripcion: String
        imagen: String
        fechaPublicacion: String
        ubicacion: String
    }

    input PagoInput {
        contrato: String
        usuario: String
        artista: String
        monto: String
        metodoPago: String
        estado: String
        fechaPago: String
    }

    # Aqui inician los Mutation
    
    type Mutation {
        nuevoUsuario(input: UsuarioInput) : Usuario
        nuevoArtista(input: ArtistaInput) : Artista
        nuevoContrato(input: ContratoInput) : String
        nuevaCalificacion(input: CalificacionInput) : String
        nuevoPago(input: PagoInput) : String
        nuevoPost(input: PostInput) : String
    }

    type Query {
        obtenerArtista: [Usuario]  # Retorna una lista de usuarios
        obtenerCalificaciones: [Calificacion] # Nueva consulta para calificaciones
        obtenerUsuario: [Usuario]
        obtenerPost: [Post]
        obtenerPago: [Pago]
        obtenerContrato: [Contrato]
    }
`;

module.exports = { typeDefs };
