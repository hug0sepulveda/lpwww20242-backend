import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import connectDB from './config/db.js';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js';

import 'dotenv/config';

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);