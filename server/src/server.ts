import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

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
    return { count};
  });

  await fastify.listen({ port: 3333});
}

bootstrap();