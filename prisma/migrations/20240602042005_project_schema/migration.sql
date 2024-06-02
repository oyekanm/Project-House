/*
  Warnings:

  - You are about to drop the column `imageId` on the `Author` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_imageId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "github" DROP NOT NULL;
