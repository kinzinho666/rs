import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TournamentService } from '../services/tournamentService';
import { authenticate } from '../middlewares/authMiddleware';

const tournamentService = new TournamentService();

export async function tournamentRoutes(app: FastifyInstance) {
  app.post<{ Body: { name: string; managerId: number } }>(
    '/tournaments',
    {
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { name, managerId } = request.body;

      try {
        const tournament = await tournamentService.createTournament({ name, managerId });
        return reply.send(tournament);
      } catch (error) {
        return reply.status(500).send({ error: 'Unable to create tournament.' });
      }
    }
  );

  // Outras rotas relacionadas a torneios
}