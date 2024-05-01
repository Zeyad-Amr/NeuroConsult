/*
  Warnings:

  - The `comorbidities` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "comorbidities",
ADD COLUMN     "comorbidities" TEXT[];

-- DropEnum
DROP TYPE "Comorbidity";

-- CreateTable
CREATE TABLE "ConsultatinReq" (
    "id" TEXT NOT NULL,
    "complaint" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "PatientId" TEXT,

    CONSTRAINT "ConsultatinReq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConsultatinReq" ADD CONSTRAINT "ConsultatinReq_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
