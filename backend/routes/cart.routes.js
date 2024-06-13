import express from 'express';
import { protectRoute} from '../middlewares/ProtectRoute.js'
import { addCart,getCart } from '../controller/cart.controller.js';
const router= express.Router();
router.get("/" ,protectRoute,getCart)
router.post("/",protectRoute,addCart)
export default router