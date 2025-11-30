import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

export interface GraphQLContext {
  prisma: PrismaClient;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = readFileSync(join(__dirname, './graphql/schema.graphql'), 'utf8');
import { resolvers } from './graphql/resolvers';

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

async function startServer() {
  const PORT = process.env.PORT || 4001;

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(PORT) },
      context: async () => ({
        prisma,
      }),
    });

    console.log(`🚀 Servidor GraphQL listo en: ${url}`);
    console.log(`🌐 Acceso a la base de datos a través de Prisma.`);

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Servidor y Prisma Client desconectados.');
  process.exit(0);
});