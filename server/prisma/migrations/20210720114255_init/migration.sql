/*
  Warnings:

  - Made the column `accountSubId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_ibfk_3`;

-- DropIndex
DROP INDEX `acctIdx` ON `Account`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `type` ENUM('SEND', 'RECEIVE', 'EXPENDITURE', 'INCOME', 'PENDING') NOT NULL,
    MODIFY `accountSubId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD FOREIGN KEY (`accountSubId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
