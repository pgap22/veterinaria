-- CreateTable
CREATE TABLE `Diagnostico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `recomendaciones` VARCHAR(191) NOT NULL,
    `idCita` INTEGER NOT NULL,
    `idVeterinario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veterinario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `especialidad` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `idVeterinario` INTEGER NOT NULL,
    `idMascota` INTEGER NOT NULL,
    `idSecretaria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Secretaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metodoPago` VARCHAR(191) NOT NULL,
    `fechaPago` DATETIME(3) NOT NULL,
    `monto` DOUBLE NOT NULL,
    `idDueno` INTEGER NOT NULL,
    `idCita` INTEGER NOT NULL,

    UNIQUE INDEX `Pago_idCita_key`(`idCita`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diagnostico` ADD CONSTRAINT `Diagnostico_idCita_fkey` FOREIGN KEY (`idCita`) REFERENCES `Cita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnostico` ADD CONSTRAINT `Diagnostico_idVeterinario_fkey` FOREIGN KEY (`idVeterinario`) REFERENCES `Veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_idVeterinario_fkey` FOREIGN KEY (`idVeterinario`) REFERENCES `Veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_idMascota_fkey` FOREIGN KEY (`idMascota`) REFERENCES `Mascota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_idSecretaria_fkey` FOREIGN KEY (`idSecretaria`) REFERENCES `Secretaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_idDueno_fkey` FOREIGN KEY (`idDueno`) REFERENCES `Dueno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_idCita_fkey` FOREIGN KEY (`idCita`) REFERENCES `Cita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
