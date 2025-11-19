import { Request, Response, NextFunction } from "express";
import { prisma } from "../../data/db";

export const getLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.links.findMany({
      select: {
        movieId: true,
        tmdbId: true,
        imdbId: true,
      },
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};
