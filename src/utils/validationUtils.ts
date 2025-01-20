import { validate } from 'class-validator';

export async function validateEntity(entity: object) {
  const errors = await validate(entity);
  if (errors.length > 0) {
    throw new Error(`Validação falhou!`);
  }
}