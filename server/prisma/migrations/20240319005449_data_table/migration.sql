-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "stdin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
