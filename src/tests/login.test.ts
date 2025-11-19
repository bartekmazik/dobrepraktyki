import { loginController } from "../controllers/auth/loginController";
import { prisma } from "../data/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../data/db", () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("loginController", () => {
  const req: any = {
    body: { email: "test@test.com", password: "password" },
  };

  const res: any = {
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should log in successfully and return a token", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      hash: "hashedpw",
      role: "ADMIN",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue("mocked-token");

    await loginController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      token: "mocked-token",
      user: { id: 1, email: "test@test.com" },
    });
  });

  test("should throw error when user not found", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await loginController(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should throw error for wrong password", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      hash: "hashedpw",
      role: "ADMIN",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await loginController(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
