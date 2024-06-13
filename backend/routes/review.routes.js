import express from 'express';
import {protectRoute} from '../middlewares/ProtectRoute.js'
import { getReviews,getSpecificReview,addReview } from '../controller/reviews.controller.js';
const router=express.Router()
router.get('/',getReviews)
router.post('/',protectRoute,addReview)
router.get("/:productid",getSpecificReview)
export default router