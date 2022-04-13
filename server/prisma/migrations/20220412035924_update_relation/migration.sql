/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `User_About` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_About_user_id_key` ON `User_About`(`user_id`);
