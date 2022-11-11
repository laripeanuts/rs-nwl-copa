import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient()

async function main() {
  const pool = await prisma.user.deleteMany({
    where: {
      participatingAt: {
        every: {

        }
      }
    }
  })

  // shuffle between 1 and 10
  const randomTen = () => Math.floor(Math.random() * 10);
  const randomHundreds = () => Math.floor(Math.random() * 100);

  const users = await prisma.user.findMany()
  const pools = await prisma.pool.findMany()
  const games = await prisma.game.findMany()
  const participants = await prisma.partcipant.findMany()
  const guesses = await prisma.guess.findMany()

  for (let i = 0; i < 1; i++) {
    await prisma.user.create({
      data: {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
      },
    })
  }

  for (let i = 0; i < 10; i++) {
    await prisma.game.create({
      data: {
        id: faker.datatype.uuid(),
        date: faker.date.future(),
        firstTeamCountryCode: faker.address.countryCode(),
        secondTeamCountryCode: faker.address.countryCode(),
      },
    })
  }

  for (let i = 0; i < 10; i++) {
    await prisma.pool.create({
      data: {
        id: faker.datatype.uuid(),
        name: faker.word.adverb(),
        code: faker.random.numeric(8),
        ownerId: users[randomTen()]?.id,
      }
    })
  };

  for (let i = 0; i < 5; i++) {
    await prisma.partcipant.create({
      data: {
        id: faker.datatype.uuid(),
        userId: users[randomHundreds()]?.id,
        poolId: pools[randomHundreds()]?.id,
      }
    })
  }

  for (let i = 0; i < 30; i++) {
    const randomGameId = games[Math.floor(Math.random() * 100)].id
    const randomPartId = participants[Math.floor(Math.random() * 100)].id

    await prisma.guess.create({
      data: {
        firstTeamScore: randomTen(),
        secondTeamScore: randomTen(),
        gameId: randomGameId,
        partcipantId: randomPartId,
      }
    })
  }
}

main();