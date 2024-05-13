/*
  Warnings:

  - The primary key for the `Shelter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Shelter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP CONSTRAINT "Shelter_pkey",
ADD COLUMN     "createdById" TEXT NOT NULL DEFAULT 'clw2vtnyv00073pj3mbnkmsmt',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Shelter" ADD CONSTRAINT "Shelter_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
