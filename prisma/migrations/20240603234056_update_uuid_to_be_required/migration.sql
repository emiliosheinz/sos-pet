/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.
  - Made the column `uuid` on table `Shelter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shelter" ALTER COLUMN "uuid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_uuid_key" ON "Shelter"("uuid");
