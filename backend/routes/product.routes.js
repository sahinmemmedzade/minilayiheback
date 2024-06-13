import express from 'express';
import { addSingleProduct,getProducts,getSingleProduct } from '../controller/product.controller.js';
const router= express.Router();

router.get("/" ,getProducts)

router.get("/:productid",getSingleProduct)

router.post("/",addSingleProduct)
export default router