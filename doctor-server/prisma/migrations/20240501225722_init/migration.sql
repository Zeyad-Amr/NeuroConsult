-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "requestMetadata" JSONB NOT NULL,
    "DoctorResponse" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);
