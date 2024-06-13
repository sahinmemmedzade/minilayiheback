import express from 'express';
import { getColors,addColor } from '../controller/color.controller.js';
const router=express.Router()
router.get('/',getColors)
router.post('/',addColor)
export default router