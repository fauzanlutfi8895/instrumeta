import express, { Router } from "express";
import { getProducts } from "src/controllers/controller.product";

const router: Router = express.Router();

router.get("/products", getProducts)

export default router;