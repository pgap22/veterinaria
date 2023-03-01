-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `Cita_idSecretaria_fkey`;

-- AlterTable
ALTER TABLE `cita` MODIFY `idSecretaria` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_idSecretaria_fkey` FOREIGN KEY (`idSecretaria`) REFERENCES `Secretaria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
