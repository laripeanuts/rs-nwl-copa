import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async (request, reply) => {
    const count = await prisma.pool.count();
    return reply.status(201).send({ count })
  });

  fastify.get("/users/count", async (request, reply) => {
    const count = await prisma.user.count();
    return reply.status(201).send({ count })
  });

  fastify.get("/guesses/count", async (request, reply) => {
    const count = await prisma.guess.count();
    return reply.status(201).send({ count })
  });

  fastify.post("/pools", async (request, reply) => {
    const createPoolBody = z.object({
      name: z.string(),
    });

    const { name } = createPoolBody.parse(request.body);
    const generatedId = new ShortUniqueId({ length: 8 });
    const code = String(generatedId()).toLocaleUpperCase();

    await prisma.pool.create({
      data: {
        name,
        code,
      },
    });

    return reply.status(201).send({ message: "ok" });
  });

  await fastify.listen({ port: 3333});
}

bootstrap();