import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import { MovieInterface } from "../../models/movie";
import { prisma } from "../../data/db";

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.movies.findMany({
      select: {
        id: true,
        title: true,
        genres: true,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
