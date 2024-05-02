/*
  Warnings:

  - You are about to drop the column `patientId` on the `Medication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_patientId_fkey";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "patientId";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "medications" TEXT[];
