import { tournamentRepository } from '../repositories/tournamentRepository';
import { Tournament } from '../entities/Tournament';

export class TournamentService {
  async createTournament(tournamentData: { name: string, managerId: number }) {
    const tournament = tournamentRepository.create(tournamentData);
    await tournamentRepository.save(tournament);
    return tournament;
  }

  // Outros métodos relacionados ao torneio
}