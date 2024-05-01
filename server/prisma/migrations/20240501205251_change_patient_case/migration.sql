/*
  Warnings:

  - You are about to drop the column `PatientId` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `PatientId` on the `ConsultatinReq` table. All the data in the column will be lost.
  - You are about to drop the column `PatientId` on the `Diagnosis` table. All the data in the column will be lost.
  - You are about to drop the column `PatientId` on the `Imaging` table. All the data in the column will be lost.
  - You are about to drop the column `PatientId` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `PatientId` on the `Medication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_PatientId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultatinReq" DROP CONSTRAINT "ConsultatinReq_PatientId_fkey";

-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_PatientId_fkey";

-- DropForeignKey
ALTER TABLE "Imaging" DROP CONSTRAINT "Imaging_PatientId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_PatientId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_PatientId_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "PatientId",
ADD COLUMN     "patientId" TEXT;

-- AlterTable
ALTER TABLE "ConsultatinReq" DROP COLUMN "PatientId",
ADD COLUMN     "patientId" TEXT;

-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "PatientId",
ADD COLUMN     "patientId" TEXT;

-- AlterTable
ALTER TABLE "Imaging" DROP COLUMN "PatientId",
ADD COLUMN     "patientId" TEXT;

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "PatientId",
ADD COLUMN     "patientId" TEXT;

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "PatientId",
ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imaging" ADD CONSTRAINT "Imaging_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultatinReq" ADD CONSTRAINT "ConsultatinReq_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
