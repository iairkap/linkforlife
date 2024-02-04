-- CreateEnum
CREATE TYPE "InvitedBy" AS ENUM ('Bride', 'Groom', 'BridesFamily', 'GroomsFamily', 'Both');

-- CreateEnum
CREATE TYPE "SpecialRole" AS ENUM ('BestMan', 'MaidOfHonor', 'Bridesmaid', 'Groomsman', 'FlowerGirl', 'RingBearer', 'Usher', 'Reader', 'Officiant', 'Parent', 'Grandparent', 'Other', 'none');

-- CreateTable
CREATE TABLE "Sorteo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "weddingDate" TIMESTAMP(3) NOT NULL,
    "weddingPlace" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sorteo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "image" TEXT,
    "email_verified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeddingInvitationList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailInvitation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plusOne" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "invitedBy" "InvitedBy",
    "specialRole" "SpecialRole",
    "isAttending" BOOLEAN NOT NULL DEFAULT false,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "plusOneConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "groupId" INTEGER,
    "Table" INTEGER,

    CONSTRAINT "WeddingInvitationList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToWeddingInvitationList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sorteo_email_key" ON "Sorteo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToWeddingInvitationList_AB_unique" ON "_GroupToWeddingInvitationList"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToWeddingInvitationList_B_index" ON "_GroupToWeddingInvitationList"("B");

-- AddForeignKey
ALTER TABLE "WeddingInvitationList" ADD CONSTRAINT "WeddingInvitationList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToWeddingInvitationList" ADD CONSTRAINT "_GroupToWeddingInvitationList_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToWeddingInvitationList" ADD CONSTRAINT "_GroupToWeddingInvitationList_B_fkey" FOREIGN KEY ("B") REFERENCES "WeddingInvitationList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
