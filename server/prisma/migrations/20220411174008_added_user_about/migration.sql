/*
  Warnings:

  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatar`,
    DROP COLUMN `bio`,
    DROP COLUMN `phone`,
    DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `UserAbout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `status` ENUM('Mahasiswa', 'Siswa', 'Guru', 'Umum') NOT NULL DEFAULT 'Umum',
    `bio` MEDIUMTEXT NULL,
    `location` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAbout` ADD CONSTRAINT `UserAbout_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
