import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import { ratingInterface } from "../../models/rating";
import { prisma } from "../../data/db";

export const getRatings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.ratings.findMany({
      select: {
        movieId: true,
        rating: true,
        userId: true,
        timestamp: true,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
