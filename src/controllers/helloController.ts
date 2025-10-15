import { Request, Response, NextFunction } from "express";

export const getHelloWorld = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ message: "Hello World" });
  } catch (error) {
    next(error);
  }
};
