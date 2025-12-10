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

export const deleteLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    await prisma.links.delete({
      where: {
        movieId: id,
      },
    });

    res.json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, tmbdId, imdbId } = req.body;
  try {
    await prisma.links.update({
      where: {
        movieId: id,
      },
      data: {
        tmdbId: tmbdId,
        imdbId: imdbId,
      },
    });

    res.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
};

export const createLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, tmbdId, imdbId } = req.body;
  try {
    await prisma.links.create({
      data: {
        movieId: id,
        tmdbId: tmbdId,
        imdbId: imdbId,
      },
    });

    res.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
};
