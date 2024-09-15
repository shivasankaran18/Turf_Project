/*
  Warnings:

  - A unique constraint covering the columns `[teamLeadId]` on the table `TournamentParticipant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TournamentParticipant_teamLeadId_key" ON "TournamentParticipant"("teamLeadId");
