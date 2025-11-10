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

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      description, 
      price, 
      stock, 
      participants, 
      startDate, 
      location, 
      isActive, 
      icon, 
      backgroundColor, 
      registrationLink 
    } = req.body;
    
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { 
        name, 
        description, 
        price, 
        stock,
        participants,
        startDate,
        location,
        isActive,
        icon,
        backgroundColor,
        registrationLink
      },
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      name, 
      description, 
      price, 
      stock, 
      participants, 
      startDate, 
      location, 
      isActive, 
      icon, 
      backgroundColor, 
      registrationLink 
    } = req.body;
    
    const newProduct = await prisma.product.create({
      data: { 
        name, 
        description, 
        price, 
        stock,
        participants: participants || 0,
        startDate: startDate || null,
        location: location || null,
        isActive: isActive !== undefined ? isActive : true,
        icon: icon || "BookOpen",
        backgroundColor: backgroundColor || "from-blue-500 via-blue-600 to-blue-700",
        registrationLink: registrationLink || null
      },
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
