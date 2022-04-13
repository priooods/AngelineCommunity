/*
  Warnings:

  - You are about to drop the `userabout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userabout` DROP FOREIGN KEY `UserAbout_user_id_fkey`;

-- DropTable
DROP TABLE `userabout`;

-- CreateTable
CREATE TABLE `User_About` (
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
ALTER TABLE `User_About` ADD CONSTRAINT `User_About_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
