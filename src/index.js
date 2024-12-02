import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './config/db.js';
import typeDefs from './schemas/index.js';
import resolvers from './resolvers/index.js';
import { startWebSocketServer } from './websocket/websocket.js';

import express from 'express';
import http from 'http';
import 'dotenv/config';

// Conectar a la base de datos
connectDB();

// Configurar Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Crear una instancia de Express
const app = express();

// Crear el servidor HTTP manualmente
const httpServer = http.createServer(app);

// Agregar middleware de Apollo Server a Express
await server.start();
app.use(
    '/',
    express.json(),
    expressMiddleware(server)
);

// Iniciar el servidor HTTP
httpServer.listen(4000, () => {
    console.log(`🚀 GraphQL API listo en http://localhost:4000/`);
});

// Iniciar el WebSocket
startWebSocketServer(httpServer);
