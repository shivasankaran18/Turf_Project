/*
  Warnings:

  - Added the required column `duration` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_teams` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mode` on the `Tournament` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "images" TEXT NOT NULL,
ADD COLUMN     "total_teams" INTEGER NOT NULL,
DROP COLUMN "mode",
ADD COLUMN     "mode" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TournamentParticipant" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamLeadName" TEXT NOT NULL,

    CONSTRAINT "TournamentParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "participation_id" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_participation_id_fkey" FOREIGN KEY ("participation_id") REFERENCES "TournamentParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
