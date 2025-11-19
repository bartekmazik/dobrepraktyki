import { userDetailsController } from "../controllers/users/userDetailsController";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("userDetailsController", () => {
  const res: any = {
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should respond with error when no token", async () => {
    const req: any = { headers: {} };

    await userDetailsController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ error: "Token not found" });
  });

  test("should decode token and return payload", async () => {
    const req: any = {
      headers: { authorization: "Bearer sometoken" },
    };

    jest
      .spyOn(jwt, "decode")
      .mockReturnValue({ id: 1, email: "test@test.com" } as any);

    await userDetailsController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      data: { id: 1, email: "test@test.com" },
    });
  });
});
