import { usersController } from "../controllers/auth/usersController";
import { prisma } from "../data/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole } from "../../generated/prisma";

jest.mock("../data/db", () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("usersController", () => {
  const next = jest.fn();
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  const baseReq: any = {
    headers: { authorization: "Bearer validtoken" },
    body: { email: "new@test.com", password: "123456" },
  };

  test("should reject when no token", async () => {
    const req = { ...baseReq, headers: {} };

    await usersController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should reject invalid token", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await usersController(baseReq, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should reject non-admin user", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ role: UserRole.USER });

    await usersController(baseReq, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test("should reject if email already taken", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ role: UserRole.ADMIN });

    (prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 1 });

    await usersController(baseReq, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("should register new admin user", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ role: UserRole.ADMIN });

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123");
    (prisma.user.create as jest.Mock).mockResolvedValue(true);

    await usersController(baseReq, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User registered" });
  });
});
