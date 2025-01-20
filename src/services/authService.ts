import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../entities/User';

export class AuthService {
  async register(userData: { name: string, email: string, password: string, role: UserRole }) {
    const user = userRepository.create(userData);
    user.password = await bcrypt.hash(user.password, 10);
    await userRepository.save(user);
    return user;
  }

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token };
  }
}