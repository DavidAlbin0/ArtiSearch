const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("../CRM GraphQL/db/Schema.cjs")
const { resolvers } = require("../CRM GraphQL/db/Resolvers.cjs")
const conectarDB = require('../CRM GraphQL/config/db.cjs')
<<<<<<< HEAD
=======
const Usuario = require('../CRM GraphQL/models/Usuario.cjs');
const Artista =require('../CRM GraphQL/models/Artista.cjs');
const Post =require('../CRM GraphQL/models/Post.cjs');
const Calificacion = require('../CRM GraphQL/models/Calificacion.cjs');
const Contrato = require('../CRM GraphQL/models/Contrato.cjs');
const Pago = require('../CRM GraphQL/models/Pago.cjs');
>>>>>>> 311b324 (es el comis)


//Conetcar a la BD
conectarDB();


// Crear servidor Apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Iniciar servidor
server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url}`);
});
