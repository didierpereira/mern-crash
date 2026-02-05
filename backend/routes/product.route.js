import { Router } from "express";
import {createProduct, deleteProduct, getProductDetails, getProducts, updateProduct} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)
router.get("/", getProducts)
router.get("/:id", getProductDetails)

export default router;