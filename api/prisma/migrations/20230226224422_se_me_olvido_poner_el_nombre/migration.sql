/*
  Warnings:

  - Added the required column `nombre` to the `Dueno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dueno` ADD COLUMN `nombre` VARCHAR(191) NOT NULL;
