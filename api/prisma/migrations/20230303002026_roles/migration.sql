-- AlterTable
ALTER TABLE `dueno` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'dueno';

-- AlterTable
ALTER TABLE `secretaria` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'secretaria';

-- AlterTable
ALTER TABLE `veterinario` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'veterinario';
