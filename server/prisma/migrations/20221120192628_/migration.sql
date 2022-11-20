/*
  Warnings:

  - A unique constraint covering the columns `[partcipantId,gameId]` on the table `Guess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guess_partcipantId_gameId_key" ON "Guess"("partcipantId", "gameId");
