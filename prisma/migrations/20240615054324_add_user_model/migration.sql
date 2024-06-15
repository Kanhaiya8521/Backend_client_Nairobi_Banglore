-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "mid_name" TEXT,
    "last_name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "social_link" TEXT,
    "age" INTEGER,
    "tob" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
