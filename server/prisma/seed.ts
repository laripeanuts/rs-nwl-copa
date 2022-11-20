import { faker } from "@faker-js/faker/locale/pt_BR";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // shuffle between 1 and 10
  const randomTen = () => Math.floor(Math.random() * 10);
  // shuffle between 1 and 100
  const randomHundreds = () => Math.floor(Math.random() * 100);
  // shuffle one array item
  const randomArray = (array: any[]) =>
    array[Math.floor(Math.random() * array.length)];

  const users = await prisma.user.findMany();
  const pools = await prisma.pool.findMany();
  const games = await prisma.game.findMany();
  const participants = await prisma.participant.findMany();

  // for (let i = 0; i < 100; i++) {
  //   await prisma.user.create({
  //     data: {
  //       id: faker.datatype.uuid(),
  //       name: faker.name.fullName(),
  //       email: faker.internet.email(),
  //       avatarUrl: faker.image.avatar(),
  //     },
  //   });
  // }

  // for (let i = 0; i < 10; i++) {
  //   await prisma.game.create({
  //     data: {
  //       id: faker.datatype.uuid(),
  //       date: faker.date.future(),
  //       firstTeamCountryCode: faker.address.countryCode(),
  //       secondTeamCountryCode: faker.address.countryCode(),
  //     },
  //   });
  // }

  // for (let i = 0; i < 10; i++) {
  //   await prisma.pool.create({
  //     data: {
  //       id: faker.datatype.uuid(),
  //       title: faker.word.adjective(),
  //       code: faker.random.numeric(8),
  //       ownerId: users[randomHundreds()]?.id,
  //     },
  //   });
  // }

  for (let i = 0; i < 50; i++) {
    await prisma.participant.create({
      data: {
        id: faker.datatype.uuid(),
        userId: randomArray(users).id,
        poolId: randomArray(pools).id,

        guesses: {
          create: [
            {
              gameId: randomArray(games).id,
              firstTeamScore: randomTen(),
              secondTeamScore: randomTen(),
            },
            {
              gameId: randomArray(games).id,
              firstTeamScore: randomTen(),
              secondTeamScore: randomTen(),
            },
          ],
        },
      },
    });
  }

  // for (let i = 0; i < 20; i++) {
  //   await prisma.guess.create({
  //     data: {
  //       firstTeamScore: randomTen(),
  //       secondTeamScore: randomTen(),
  //       gameId: randomArray(games).id,
  //       participantId: randomArray(participants).id,
  //     },
  //   });
  // }
}

main();
