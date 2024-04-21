/*
  Warnings:

  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "birthDate" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- CreateTable
CREATE TABLE "ConsultationRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "complaint" TEXT NOT NULL,
    "diagnosis" TEXT,
    "vitalsId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vitals" (
    "id" TEXT NOT NULL,
    "pulse" INTEGER NOT NULL,
    "bp" TEXT NOT NULL,
    "respiration" INTEGER NOT NULL,
    "pso2" INTEGER NOT NULL,

    CONSTRAINT "Vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "notes" TEXT,
    "consultationRequestId" TEXT,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "consultationRequestId" TEXT,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "consultationRequestId" TEXT,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "consultationRequestId" TEXT,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imaging" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "consultationRequestId" TEXT,

    CONSTRAINT "Imaging_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationRequest_vitalsId_key" ON "ConsultationRequest"("vitalsId");

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_vitalsId_fkey" FOREIGN KEY ("vitalsId") REFERENCES "Vitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_consultationRequestId_fkey" FOREIGN KEY ("consultationRequestId") REFERENCES "ConsultationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_consultationRequestId_fkey" FOREIGN KEY ("consultationRequestId") REFERENCES "ConsultationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_consultationRequestId_fkey" FOREIGN KEY ("consultationRequestId") REFERENCES "ConsultationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_consultationRequestId_fkey" FOREIGN KEY ("consultationRequestId") REFERENCES "ConsultationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imaging" ADD CONSTRAINT "Imaging_consultationRequestId_fkey" FOREIGN KEY ("consultationRequestId") REFERENCES "ConsultationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
