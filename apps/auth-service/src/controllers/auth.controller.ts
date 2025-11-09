import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setCookie } from "../utils/cookie";
import { prisma } from "@packages/lib/prisma";
import { AuthError, ValidationError } from "@packages/error-handler";
import { use } from "react";

export const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new ValidationError("Username and password are required."));
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return next(new AuthError("User doesn't exist"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AuthError("Invalid username or password."));
    }

    // Tambahkan role disini
    const accessToken = jwt.sign({ username, role: user.role }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ username, role: user.role }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });

    setCookie(res, "accessToken", accessToken);
    setCookie(res, "refreshToken", refreshToken);

    res.status(200).json({
      message: "Login successful",
      user: {
        username,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, role } = req.body;
    
    if (!username || !password) {
      return next(new ValidationError("Username and password are required."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      role: role,
    };

    await prisma.user.create({
      data: newUser,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return next(error);
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {}
};
