import { Request, Response, NextFunction } from "express";
import { prisma } from "../../data/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userDetailsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.substring(7);
    if (!token) {
      res.json({ error: "Token not found" });
    }

    const data = token ? jwt.decode(token) : null;

    res.json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
}
