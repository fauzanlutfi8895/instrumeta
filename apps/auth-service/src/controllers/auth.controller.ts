import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setCookie } from "../utils/cookie";
import { prisma } from "@packages/lib/prisma";

export const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Tambahkan role disini
    const accessToken = jwt.sign({ username }, process.env.SECRET_KEY!);

    setCookie(res, "accessToken", accessToken);
    res.status(200).json({
      message: "Login successful",
      user: {
        username,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      role: "USER",
    };

    await prisma.user.create({
      data: newUser,
    })
    
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return next(error);
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {}
};
