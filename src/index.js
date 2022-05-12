const { ApolloServer } = require('apollo-server');

const ServerAPI = require('./datasources/api');
const typeDefs = require('./graphql/schema');
const resolvers = require('./resolvers/index');

const env = require('./env/env.json');
const db = require('./env/db.json');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ serverAPI: new ServerAPI(db.knexConfig) }),
});

server.listen({ port: env.SERVER_PORT }).then(({ url }) => console.log(`Server started at ${url}`));
