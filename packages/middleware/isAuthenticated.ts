import { NextFunction, Response } from "express";
import { prisma } from "@packages/lib/prisma";
import { AuthError } from "@packages/error-handler";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["accessToken"];
    if (!token) {
      return next(new AuthError("Unauthorized: Token missing"));
    }

    // Verify token and extract payload
    let decoded: { username: string; role: string };
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { username: string; role: string };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(new AuthError("Unauthorized: Token expired"));
      }
      if (error instanceof JsonWebTokenError) {
        return next(new AuthError("Unauthorized: Invalid token"));
      }
      throw error;
    }

    const account = await prisma.user.findUnique({
      where: { username: decoded.username },
    });

    if (!account) {
      return next(new AuthError("Unauthorized: User not found"));
    }

    req.user = account;
    return next();
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal Server Error in isAuthenticated",
      detail: error.message,
    });
  }
};

export default isAuthenticated;
