/*
  Warnings:

  - A unique constraint covering the columns `[teamLeadId]` on the table `TournamentParticipant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamLeadId` to the `TournamentParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentParticipant" ADD COLUMN     "teamLeadId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TournamentParticipant_teamLeadId_key" ON "TournamentParticipant"("teamLeadId");

-- AddForeignKey
ALTER TABLE "TournamentParticipant" ADD CONSTRAINT "TournamentParticipant_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
