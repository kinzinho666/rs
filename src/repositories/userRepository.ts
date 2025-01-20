import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User).extend({
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  },
});