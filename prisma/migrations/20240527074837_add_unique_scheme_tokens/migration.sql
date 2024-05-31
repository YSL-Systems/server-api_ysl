/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tokens` MODIFY `userId` INTEGER NOT NULL,
    MODIFY `token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tokens_userId_key` ON `tokens`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `tokens_token_key` ON `tokens`(`token`);
