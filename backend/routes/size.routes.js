import express from 'express';
import { getSizes,addSize } from '../controller/size.controller.js';
const router=express.Router()
router.get('/',getSizes)
router.post('/',addSize)
export default router