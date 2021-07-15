-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `accNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`accNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `accNumber` INTEGER NOT NULL,
    `type` ENUM('SEND', 'RECEIVE', 'SPEND', 'EARN') NOT NULL,
    `amount` INTEGER NOT NULL,
    `category` INTEGER NOT NULL,
    `accSubNumber` INTEGER NOT NULL,

    PRIMARY KEY (`transNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` INTEGER NOT NULL,
    `categoryNum` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `balance` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD FOREIGN KEY (`accNumber`) REFERENCES `Account`(`accNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD FOREIGN KEY (`accSubNumber`) REFERENCES `Account`(`accNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
