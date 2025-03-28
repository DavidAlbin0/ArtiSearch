const Usuario = require('../models/Usuario.cjs')
const Artista = require('../models/Artista.cjs')
const bcryptjs = require('bcryptjs')

const resolvers = {
    Query: {
        obtenerArtista: () => "Algo",
        
        obtenerCalificaciones: () => "Algo",

        obtenerUsuario: () => "Algo",

        obtenerPost: () => "Algo",

        obtenerContrato: () => "Algo",

        obtenerPago: () => "Algo"
    },

    Mutation: {
        nuevoUsuario: async (_, { input }) => {
            const { email, password } = input;
        
            // Revisar si el usuario ya está registrado
            const existeUsuario = await Usuario.findOne({ email });
            if (existeUsuario) {
                throw new Error('El usuario ya está registrado');
            }
        
            // Hashear password correctamente
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);
        
            try {
                // Crear usuario y guardar en la base de datos
                const nuevoUsuario = new Usuario(input);
                await nuevoUsuario.save();
        
                console.log('Usuario creado:', nuevoUsuario);
                return nuevoUsuario;
            } catch (error) {
                console.error('Error al crear usuario:', error);
                throw new Error('No se pudo crear el usuario');
            }
        },
         
        nuevoArtista: async (_, { input }) => {
            const { email, password } = input;
        
            // Revisar si el artista ya está registrado
            const existeArtista = await Artista.findOne({ email });
            if (existeArtista) {
                throw new Error('El artista ya está registrado');
            }
        
            try {
                // Hashear el password
                const salt = await bcryptjs.genSalt(10);  // Usamos genSalt
                input.password = await bcryptjs.hash(password, salt);  // Hasheamos el password
        
                // Crear nuevo artista
                const nuevoArtista = new Artista(input);  // Usar el modelo Artista en lugar de Usuario
                
                // Guardar en la base de datos
                await nuevoArtista.save();
                
                console.log('Artista creado:', nuevoArtista);
                
                return nuevoArtista;
            } catch (error) {
                console.error('Error al crear artista:', error);
                throw new Error('No se pudo crear el artista');
            }
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
