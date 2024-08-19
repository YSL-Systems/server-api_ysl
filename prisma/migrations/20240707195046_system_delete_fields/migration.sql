/*
  Warnings:

  - You are about to drop the column `image` on the `systems` table. All the data in the column will be lost.
  - You are about to drop the column `screen` on the `systems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `systems` DROP COLUMN `image`,
    DROP COLUMN `screen`;
