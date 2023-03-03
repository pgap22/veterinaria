/*
  Warnings:

  - Added the required column `idDueno` to the `cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cita` ADD COLUMN `idDueno` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `cita` ADD CONSTRAINT `cita_idDueno_fkey` FOREIGN KEY (`idDueno`) REFERENCES `dueno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
