import { Request, Response, NextFunction } from "express";
import { prisma } from "@packages/lib/prisma";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    return next(error);
  }
};


