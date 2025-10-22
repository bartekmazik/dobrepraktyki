/*
  Warnings:

  - You are about to drop the column `Genres` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `genres` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genres" TEXT NOT NULL
);
INSERT INTO "new_Movies" ("id", "title") SELECT "id", "title" FROM "Movies";
DROP TABLE "Movies";
ALTER TABLE "new_Movies" RENAME TO "Movies";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
