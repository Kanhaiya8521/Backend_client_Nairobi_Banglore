-- CreateEnum
CREATE TYPE "VERIFICATION_TYPE" AS ENUM ('LOGIN', 'FORGET_PASSWORD', 'EMAIL_VERIFICATION', 'PHONE_VERIFICATION');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "mid_name" TEXT,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "social_link" TEXT,
    "age" INTEGER,
    "tob" TEXT,
    "referral_code" TEXT,
    "referral_by" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "store_code" TEXT,
    "store" TEXT,
    "created_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOTPVerifications" (
    "id" TEXT NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified_at" TIMESTAMP(3),
    "is_logged_in_verified" BOOLEAN NOT NULL DEFAULT false,
    "logged_in_verified_at" TIMESTAMP(3),
    "verification_code" TEXT NOT NULL,
    "verification_type" "VERIFICATION_TYPE" NOT NULL,
    "verification_code_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersOTPVerifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_name_key" ON "Users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_referral_code_key" ON "Users"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_id_key" ON "Admins"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_user_name_key" ON "Admins"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_store_code_key" ON "Admins"("store_code");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOTPVerifications_id_key" ON "UsersOTPVerifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOTPVerifications_user_id_key" ON "UsersOTPVerifications"("user_id");

-- AddForeignKey
ALTER TABLE "UsersOTPVerifications" ADD CONSTRAINT "UsersOTPVerifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
