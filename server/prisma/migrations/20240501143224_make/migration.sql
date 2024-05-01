/*
  Warnings:

  - You are about to drop the column `consultationRequestId` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `consultationRequestId` on the `Imaging` table. All the data in the column will be lost.
  - You are about to drop the column `consultationRequestId` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `consultationRequestId` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ConsultationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disease` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Comorbidity" AS ENUM ('HYPERTENSION', 'DIABETES', 'CARDIOVASCULAR_Diagnosis', 'OBESITY', 'CHRONIC_RESPIRATORY_CONDITION', 'IMMUNODEFICIENCY_DISORDER', 'CHRONIC_KIDNEY_Diagnosis', 'LIVER_Diagnosis', 'CANCER', 'AUTOIMMUNE_DISORDER', 'NEUROLOGICAL_DISORDER', 'GASTROINTESTINAL_DISORDER', 'ENDOCRINE_DISORDER', 'PSYCHIATRIC_DISORDER', 'BONE_AND_JOINT_DISORDER', 'INFECTIOUS_Diagnosis', 'HEMATOLOGICAL_DISORDER', 'METABOLIC_SYNDROME', 'SLEEP_APNEA', 'SUBSTANCE_USE_DISORDER');

-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_consultationRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationRequest" DROP CONSTRAINT "ConsultationRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationRequest" DROP CONSTRAINT "ConsultationRequest_vitalsId_fkey";

-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_consultationRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Imaging" DROP CONSTRAINT "Imaging_consultationRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_consultationRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_consultationRequestId_fkey";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "consultationRequestId",
ADD COLUMN     "PatientId" TEXT;

-- AlterTable
ALTER TABLE "Imaging" DROP COLUMN "consultationRequestId",
ADD COLUMN     "PatientId" TEXT;

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "consultationRequestId",
ADD COLUMN     "PatientId" TEXT;

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "consultationRequestId",
ADD COLUMN     "PatientId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "birthDate",
DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Vitals" ADD COLUMN     "patientId" TEXT;

-- DropTable
DROP TABLE "ConsultationRequest";

-- DropTable
DROP TABLE "Disease";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "comorbidities" "Comorbidity"[],
    "bloodType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "PatientId" TEXT,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_key" ON "Patient"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imaging" ADD CONSTRAINT "Imaging_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
