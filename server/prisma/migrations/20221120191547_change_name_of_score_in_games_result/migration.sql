/*
  Warnings:

  - You are about to drop the column `firstTeamPoints` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamPoints` on the `GameResult` table. All the data in the column will be lost.
  - Added the required column `firstTeamScore` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondTeamScore` to the `GameResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "firstTeamScore" INTEGER NOT NULL,
    "secondTeamScore" INTEGER NOT NULL,
    CONSTRAINT "GameResult_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameResult" ("gameId", "id") SELECT "gameId", "id" FROM "GameResult";
DROP TABLE "GameResult";
ALTER TABLE "new_GameResult" RENAME TO "GameResult";
CREATE UNIQUE INDEX "GameResult_gameId_key" ON "GameResult"("gameId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
