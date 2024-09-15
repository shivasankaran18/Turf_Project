/*
  Warnings:

  - You are about to drop the column `registratoinstartDate` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `registrationstartDate` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "registratoinstartDate",
ADD COLUMN     "registrationstartDate" TEXT NOT NULL;
