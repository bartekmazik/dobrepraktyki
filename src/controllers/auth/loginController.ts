import { Request, Response, NextFunction } from "express";
import { prisma } from "../../data/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw Error("User not found");
    }

    const match = bcrypt.compare(password, user.hash);

    if (!match) {
      throw new Error("Password incorrect");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}
