/*
  Warnings:

  - The primary key for the `Ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL
);
INSERT INTO "new_Ratings" ("movieId", "rating", "timestamp", "userId") SELECT "movieId", "rating", "timestamp", "userId" FROM "Ratings";
DROP TABLE "Ratings";
ALTER TABLE "new_Ratings" RENAME TO "Ratings";
CREATE UNIQUE INDEX "Ratings_userId_movieId_key" ON "Ratings"("userId", "movieId");
CREATE TABLE "new_Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL
);
INSERT INTO "new_Tags" ("movieId", "tag", "timestamp", "userId") SELECT "movieId", "tag", "timestamp", "userId" FROM "Tags";
DROP TABLE "Tags";
ALTER TABLE "new_Tags" RENAME TO "Tags";
CREATE UNIQUE INDEX "Tags_userId_movieId_tag_key" ON "Tags"("userId", "movieId", "tag");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
