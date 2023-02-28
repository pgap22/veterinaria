-- CreateTable
CREATE TABLE `Mascota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `especie` VARCHAR(191) NOT NULL,
    `raza` VARCHAR(191) NOT NULL,
    `genero` BOOLEAN NOT NULL,
    `edad` INTEGER NOT NULL,
    `id_usuarioDueno` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_id_usuarioDueno_fkey` FOREIGN KEY (`id_usuarioDueno`) REFERENCES `Dueno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
