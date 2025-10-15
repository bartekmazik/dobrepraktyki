-- CreateTable
CREATE TABLE "Movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "Genres" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tags" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Links" (
    "movieId" TEXT NOT NULL PRIMARY KEY,
    "imdbId" TEXT NOT NULL,
    "tmdbId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ratings" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL
);
