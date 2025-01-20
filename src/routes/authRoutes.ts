import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/authService';
import { UserRole } from '../entities/User';
import { authenticate } from '../middlewares/authMiddleware';

const authService = new AuthService();

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request: FastifyRequest<{ Body: { name: string; email: string; password: string; role: UserRole } }>, reply: FastifyReply) => {
    const user = await authService.register(request.body);
    reply.send(user);
  });

  app.post('/login', async (request: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) => {
    const { email, password } = request.body;
    const token = await authService.login(email, password);
    reply.send({ token });
  });

  // Exemplo de uma rota protegida
  app.get('/protected-route', { preHandler: [authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: 'Rota protegida' });
  });
}