import jwt from 'jsonwebtoken';

export function generateToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET!); }

export function verifyToken(token: string): object | string {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
