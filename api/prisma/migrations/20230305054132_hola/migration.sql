/*
  Warnings:

  - You are about to alter the column `edad` on the `mascota` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `mascota` MODIFY `edad` INTEGER NOT NULL;
