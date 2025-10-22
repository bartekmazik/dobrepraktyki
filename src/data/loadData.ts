import * as fs from "fs/promises";
import { LinkInterface } from "../models/links";
import { prisma } from "./db";
import { MovieInterface } from "../models/movie";
import { ratingInterface } from "../models/rating";
import { TagInterface } from "../models/tag";

// Load link data
async function loadLinksData(): Promise<LinkInterface[] | void> {
  try {
    const existingData = await prisma.links.findFirst({
      select: {
        movieId: true,
      },
    });
    if (existingData) {
      return;
    }
    const data = await fs.readFile("src/data/links.csv", "utf8");

    const lines = data.trim().split("\n");
    const header = lines.shift();
    if (!header) return [];

    const links = await Promise.all(
      lines.map(async (line) => {
        const [movieId, imdbId, tmdbId] = line.split(",");

        const link = await prisma.links.create({
          data: {
            movieId: movieId?.trim() || "",
            imdbId: imdbId?.trim() || "",
            tmdbId: tmdbId?.trim() || "",
          },
        });

        return link;
      })
    );

    return links;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

//Load movie data
async function loadMovieData(): Promise<MovieInterface[] | void> {
  try {
    const existingData = await prisma.movies.findFirst({
      select: {
        id: true,
      },
    });
    if (existingData) {
      return;
    }
    const data = await fs.readFile("src/data/movies.csv", "utf8");

    const lines = data.trim().split("\n");
    const header = lines.shift();
    if (!header) return [];

    const movies = await Promise.all(
      lines.map(async (line) => {
        const [id, title, genres] = line.split(",");

        const movie = await prisma.movies.create({
          data: {
            id: id?.trim() || "",
            title: title?.trim() || "",
            genres: genres?.trim() || "",
          },
        });

        return movie;
      })
    );

    return movies;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

//load ratings data
async function loadRatingsData(): Promise<ratingInterface[] | void> {
  try {
    const existingData = await prisma.ratings.findFirst({
      select: {
        movieId: true,
      },
    });
    if (existingData) {
      return;
    }
    const data = await fs.readFile("src/data/ratings.csv", "utf8");

    const lines = data.trim().split("\n");
    const header = lines.shift();
    if (!header) return [];

    const ratings = await Promise.all(
      lines.map(async (line) => {
        const [userId, movieId, rating, timestamp] = line.split(",");

        const ratingRecord = await prisma.ratings.create({
          data: {
            userId: userId?.trim() || "",
            movieId: movieId?.trim() || "",
            rating: rating?.trim() || "",
            timestamp: timestamp?.trim() || "",
          },
        });

        return ratingRecord;
      })
    );

    return ratings;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

//load tags data
async function loadTagsData(): Promise<TagInterface[] | void> {
  try {
    const existingData = await prisma.tags.findFirst({
      select: {
        movieId: true,
      },
    });
    if (existingData) {
      return;
    }
    const data = await fs.readFile("src/data/tags.csv", "utf8");

    const lines = data.trim().split("\n");
    const header = lines.shift();
    if (!header) return [];

    const tags = await Promise.all(
      lines.map(async (line) => {
        const [userId, movieId, tag, timestamp] = line.split(",");

        const tagRecord = await prisma.tags.create({
          data: {
            userId: userId?.trim() || "",
            movieId: movieId?.trim() || "",
            tag: tag?.trim() || "",
            timestamp: timestamp?.trim() || "",
          },
        });

        return tagRecord;
      })
    );

    return tags;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

export default async function loadData() {
  await loadMovieData();
  await loadLinksData();
  await loadRatingsData();
  await loadTagsData();
  console.log("Wczytywanie zakończone");
}
