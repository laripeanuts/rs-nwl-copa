import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Sandy Doe",
      email: 'sandy.doe@gmail.com',
      avatarUrl: 'https://github.com/larissapeanuts.png'
    },
  });

  const pool = await prisma.pool.create({
    data: {
      name: "Pool 1",
      code: "123456",
      ownerId: user.id,

      partcipants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T00:00:00.000Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",
    }
  });

  await prisma.game.create({
    data: {
      date: "2022-10-04T08:10:00.000Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "UK",

      guesses: {
        create: {
          firstTeamScore: 2,
          secondTeamScore: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });

}

main();

