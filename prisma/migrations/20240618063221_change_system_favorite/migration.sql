/*
  Warnings:

  - You are about to drop the column `favorites_id` on the `systems` table. All the data in the column will be lost.
  - Added the required column `favorite` to the `systems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `systems` DROP FOREIGN KEY `systems_favorites_id_fkey`;

-- AlterTable
ALTER TABLE `systems` DROP COLUMN `favorites_id`,
    ADD COLUMN `favorite` BOOLEAN NOT NULL;
