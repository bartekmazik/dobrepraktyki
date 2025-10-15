import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import { MovieInterface } from "../models/movie";

async function readData(): Promise<MovieInterface[]> {
  try {
    const data = await fs.readFile("src/data/movies.csv", "utf8");

    const lines = data.trim().split("\n");
    const header = lines.shift();
    if (!header) return [];

    const movies: MovieInterface[] = lines.map((line) => {
      const [id, title, genres] = line.split(",");

      return {
        id: id?.trim() || "",
        title: title?.trim() || "",
        genres: genres?.trim() || "",
      };
    });

    return movies;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
