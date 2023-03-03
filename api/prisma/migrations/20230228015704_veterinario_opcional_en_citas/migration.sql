-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `Cita_idVeterinario_fkey`;

-- AlterTable
ALTER TABLE `cita` MODIFY `idVeterinario` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_idVeterinario_fkey` FOREIGN KEY (`idVeterinario`) REFERENCES `Veterinario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
