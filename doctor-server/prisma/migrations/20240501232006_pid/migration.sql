/*
  Warnings:

  - Added the required column `PID` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "PID" TEXT NOT NULL,
ALTER COLUMN "DoctorResponse" SET DEFAULT 'No response yet';
