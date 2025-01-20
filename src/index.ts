import fastify from 'fastify';
import swagger from 'fastify-swagger';
import fastifyJwt from 'fastify-jwt';
import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv';

dotenv.config();
const app = fastify({ logger: true });

app.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Kart Tournament API',
      description: 'API de gestão de torneios de corrida de kart',
      version: '1.0.0'
    },
  },
  exposeRoute: true
});

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não foi definido nas variáveis de ambiente');
}

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET
});

AppDataSource.initialize().then(() => {
  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Servidor ativo em ${address}`);
  });
}).catch((error) => {
  console.error('Erro na inicialização do DataSource', error);
  process.exit(1);
});