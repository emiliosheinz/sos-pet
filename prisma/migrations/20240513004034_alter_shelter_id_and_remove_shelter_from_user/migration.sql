/*
  Warnings:

  - The primary key for the `Shelter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdById` on the `Shelter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shelter" DROP CONSTRAINT "Shelter_createdById_fkey";

-- DropIndex
DROP INDEX "Shelter_createdById_key";

-- AlterTable
ALTER TABLE "Shelter" DROP CONSTRAINT "Shelter_pkey",
DROP COLUMN "createdById",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shelter_id_seq";
