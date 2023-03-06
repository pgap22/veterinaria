/*
  Warnings:

  - You are about to drop the column `fecha` on the `diagnostico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `Cita_idMascota_fkey`;

-- DropForeignKey
ALTER TABLE `diagnostico` DROP FOREIGN KEY `Diagnostico_idCita_fkey`;

-- DropForeignKey
ALTER TABLE `pago` DROP FOREIGN KEY `Pago_idCita_fkey`;

-- AlterTable
ALTER TABLE `diagnostico` DROP COLUMN `fecha`;

-- AddForeignKey
ALTER TABLE `cita` ADD CONSTRAINT `Cita_idMascota_fkey` FOREIGN KEY (`idMascota`) REFERENCES `mascota`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnostico` ADD CONSTRAINT `Diagnostico_idCita_fkey` FOREIGN KEY (`idCita`) REFERENCES `cita`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `Pago_idCita_fkey` FOREIGN KEY (`idCita`) REFERENCES `cita`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
