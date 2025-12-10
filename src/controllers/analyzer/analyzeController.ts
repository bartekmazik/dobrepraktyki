import { Request, Response, NextFunction } from "express";
import { detectPeopleFromUrl } from "./analyzer";

export async function getPeopleCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { url } = req.body;

    console.log(url);
    const { count } = await detectPeopleFromUrl(url);

    return res.json({ message: `${count} people on photo` });
  } catch (error) {
    next(error);
  }
}
