/*
  Warnings:

  - You are about to drop the column `id_usuarioDueno` on the `mascota` table. All the data in the column will be lost.
  - Added the required column `id_dueno` to the `Mascota` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mascota` DROP FOREIGN KEY `Mascota_id_usuarioDueno_fkey`;

-- AlterTable
ALTER TABLE `mascota` DROP COLUMN `id_usuarioDueno`,
    ADD COLUMN `id_dueno` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_id_dueno_fkey` FOREIGN KEY (`id_dueno`) REFERENCES `Dueno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
