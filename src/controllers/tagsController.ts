import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";
import { TagInterface } from "../models/tag";
import { prisma } from "../data/db";

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.tags.findMany({
      select: {
        movieId: true,
        userId: true,
        timestamp: true,
        tag: true,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
