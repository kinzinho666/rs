import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

export async function authenticate(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
  done();
}