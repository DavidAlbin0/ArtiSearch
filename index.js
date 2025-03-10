const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("../CRM GraphQL/db/Schema.cjs")
const { resolvers } = require("../CRM GraphQL/db/Resolvers.cjs")
const conectarDB = require('../CRM GraphQL/config/db.cjs')


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
