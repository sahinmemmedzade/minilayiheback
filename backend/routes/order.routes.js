import express from 'express';
import { addOrder,getOrders,getSingleOrder } from '../controller/orders.controller.js';
const router= express.Router();
router.get("/" ,getOrders)
router.get("/:userId",getSingleOrder)
router.post("/",addOrder)
export default router