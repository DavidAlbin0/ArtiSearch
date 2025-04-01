const Usuario = require('../models/Usuario.cjs');
const Artista = require('../models/Artista.cjs');
const Contrato = require('../models/Contrato.cjs');
const Pago = require('../models/Pago.cjs');
const Calificacion = require('../models/Calificacion.cjs');
const Post = require('../models/Post.cjs');
const bcrypt = require('bcryptjs'); // IMPORTAR bcryptjs
const bcryptjs = require('bcryptjs'); // IMPORTAR bcryptjs
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'PALABRASECRETA'})

const crearToken = (usuario, PALABRASECRETA, expiresIn) => {
    console.log(usuario);  // Verifica qué valores tiene usuario
    const { id, email, nombre, apellidoP } = usuario; 

    return jwt.sign({ id, email, nombre, apellidoP }, PALABRASECRETA, { expiresIn });
};

const crearTokenArt = (Artista, PALABRASECRETA, expiresIn) => {
    console.log(Artista);  // Verifica qué valores tiene usuario
    const { id, email, nombre, apellidoP } = Artista; 

    return jwt.sign({ id, email, nombre, apellidoP }, PALABRASECRETA, { expiresIn });
};

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
        
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input;

            const existeUsuario = await Usuario.findOne({ email });
            if (!existeUsuario) {
                throw new Error('El usuario no existe');  // Mensaje corregido
            }

            // Revisar si password es correcto
            const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error('El password es incorrecto');
            }

            // Crear Token
            return {
                token: crearToken(existeUsuario, process.env.PALABRASECRETA, '72h'),
            };
        },

        
        autenticarArtista: async (_, { input }) => {
            const { email, password } = input;

            const existeArtista = await Artista.findOne({ email });
            if (!existeArtista) {
                throw new Error('Este Artista no existe');  // Mensaje corregido
            }

            // Revisar si password es correcto
            const passwordCorrecto = await bcrypt.compare(password, existeArtista.password);
            if (!passwordCorrecto) {
                throw new Error('El password es incorrecto');
            }

            // Crear Token
            return {
                token: crearToken(existeArtista, process.env.PALABRASECRETA, '72h'),
            };
        },


        nuevoContrato: async (_, { input }) => {
            try {
              // Verificar si el artista ya tiene 3 contratos activos
              const contratosActivos = await Contrato.countDocuments({
                artista: input.artista,
                estado: { $nin: ["Finalizado", "Cancelado"] }
              });
      
              if (contratosActivos >= 3) {
                throw new Error("Lo siento, ya tienes 3 contratos activos. Termina uno para poder continuar.");
              }
      
              // Guardar el nuevo contrato
              const nuevoContrato = new Contrato(input);
              await nuevoContrato.save();
      
              // Si el contrato NO está "Finalizado" ni "Cancelado", crear un pago asociado
              if (input.estado !== "Finalizado" && input.estado !== "Cancelado") {
                const nuevoPago = new Pago({
                  contrato: nuevoContrato._id,
                  usuario: input.usuario,
                  artista: input.artista,
                  monto: input.monto, // Mismo monto del contrato
                  metodoPago: 'Pendiente', // Se actualizará después
                  estado: "Pendiente", // Pago inicial en estado Pendiente
                  fechaPago: null // Solo se asignará cuando el estado cambie
                });
      
                await nuevoPago.save();
              }
      
              return nuevoContrato;
            } catch (error) {
              console.error(error);
              throw new Error("Error al crear el contrato");
            }
          },

          nuevoPago: async (_, { input }) => {
            try {
              // Buscar el contrato existente
              const contrato = await Contrato.findById(input.contrato);
              if (!contrato) {
                throw new Error("El contrato no existe.");
              }
      
              // Crear un nuevo pago solo si el contrato no está finalizado o cancelado
              if (contrato.estado !== "Finalizado" && contrato.estado !== "Cancelado") {
                const nuevoPago = new Pago({
                  contrato: contrato._id,
                  usuario: contrato.usuario,
                  artista: contrato.artista,
                  monto: contrato.monto, // Mismo monto del contrato
                  metodoPago: 'Pendiente', // Se actualizará después
                  estado: "Pendiente", // Pago inicial en estado Pendiente
                  fechaPago: null // Solo se asignará cuando el estado cambie
                });
      
                await nuevoPago.save();
                return nuevoPago;
              } else {
                throw new Error("No se puede generar un pago para un contrato finalizado o cancelado.");
              }
            } catch (error) {
              console.error(error);
              throw new Error("Error al generar el pago.");
            }
          },

          nuevaCalificacion: async (_, { input }) => {
            const { usuario, artista, calif, comentario, imagen } = input;

            try {
                // Verificar si el usuario y el artista existen
                const existeUsuario = await Usuario.findById(usuario);
                if (!existeUsuario) {
                    throw new Error("El usuario no existe");
                }

                const existeArtista = await Artista.findById(artista);
                if (!existeArtista) {
                    throw new Error("El artista no existe");
                }

                // Convertir calificación a número (por si viene como string)
                const calificacionNumero = parseFloat(calif);
                if (isNaN(calificacionNumero) || calificacionNumero < 1 || calificacionNumero > 5) {
                    throw new Error("La calificación debe ser un número entre 1 y 5");
                }

                // Crear nueva calificación
                const nuevaCalificacion = new Calificacion({
                    usuario,
                    artista,
                    calif: calificacionNumero,
                    comentario,
                    imagen
                });

                // Guardar en la base de datos
                await nuevaCalificacion.save();

                return nuevaCalificacion;
            } catch (error) {
                console.error("Error al registrar la calificación:", error.message);
                throw new Error("No se pudo registrar la calificación");
            }
        },
    
      nuevoPost: async (_, { input }) => {
            const { artista, titulo, descripcion, imagen, ubicacion } = input;

            try {
                // Verificar si el artista existe
                const existeArtista = await Artista.findById(artista);
                if (!existeArtista) {
                    throw new Error("El artista no existe");
                }

                // Crear nuevo post
                const nuevoPost = new Post({
                    artista,
                    titulo,
                    descripcion,
                    imagen,
                    ubicacion
                });

                // Guardar en la base de datos
                await nuevoPost.save();

                return nuevoPost;
            } catch (error) {
                console.error("Error al publicar el post:", error.message);
                throw new Error("No se pudo publicar el post");
            }
        },
    }
};

module.exports = { resolvers };
