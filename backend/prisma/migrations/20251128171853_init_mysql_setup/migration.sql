-- CreateTable
CREATE TABLE `Plant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Plant_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Operation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RangeVolume` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,

    UNIQUE INDEX `RangeVolume_name_key`(`name`),
    UNIQUE INDEX `RangeVolume_order_key`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndirectCost` (
    `id` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `plantId` VARCHAR(191) NOT NULL,
    `operationId` VARCHAR(191) NOT NULL,
    `rangeVolumeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `IndirectCost_plantId_operationId_rangeVolumeId_key`(`plantId`, `operationId`, `rangeVolumeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IndirectCost` ADD CONSTRAINT `IndirectCost_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndirectCost` ADD CONSTRAINT `IndirectCost_operationId_fkey` FOREIGN KEY (`operationId`) REFERENCES `Operation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndirectCost` ADD CONSTRAINT `IndirectCost_rangeVolumeId_fkey` FOREIGN KEY (`rangeVolumeId`) REFERENCES `RangeVolume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
