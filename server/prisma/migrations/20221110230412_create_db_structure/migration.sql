-- CreateTable
CREATE TABLE "Partcipant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    CONSTRAINT "Partcipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Partcipant_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstTeamScore" INTEGER NOT NULL,
    "secondTeamScore" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "partcipantId" TEXT NOT NULL,
    CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_partcipantId_fkey" FOREIGN KEY ("partcipantId") REFERENCES "Partcipant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ownerId" TEXT,
    CONSTRAINT "Pool_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pool" ("CreatedAt", "code", "id", "name") SELECT "CreatedAt", "code", "id", "name" FROM "Pool";
DROP TABLE "Pool";
ALTER TABLE "new_Pool" RENAME TO "Pool";
CREATE UNIQUE INDEX "Pool_code_key" ON "Pool"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Partcipant_userId_poolId_key" ON "Partcipant"("userId", "poolId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
