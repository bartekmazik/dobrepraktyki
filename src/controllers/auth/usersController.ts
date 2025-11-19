import { Request, Response, NextFunction } from "express";
import { prisma } from "../../data/db";
import bcrypt from "bcrypt";
import { UserRole } from "../../../generated/prisma";
import jwt from "jsonwebtoken";

interface TokenPayload extends jwt.JwtPayload {
  role: UserRole;
}

export async function usersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token providen" });
    }

    const token = authHeader.substring(7);
    let tokenData: TokenPayload;

    try {
      tokenData = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const isAdmin = tokenData.role === UserRole.ADMIN;

    if (!isAdmin) {
      return res.status(403).json({
        error: "You don't have permission to add new users",
      });
    }

    const emailTaken = await prisma.user.findFirst({
      where: { email },
    });

    if (emailTaken) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    await prisma.user.create({
      data: {
        email,
        hash: await bcrypt.hash(password, 10),
        role: UserRole.ADMIN,
      },
    });

    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
}
