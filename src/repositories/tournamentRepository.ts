import { AppDataSource } from '../data-source';
import { Tournament } from '../entities/Tournament';

export const tournamentRepository = AppDataSource.getRepository(Tournament).extend({
  // Métodos específicos do Tournament
});
