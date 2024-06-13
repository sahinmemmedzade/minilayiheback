import express from 'express'
import { signin,signup,logout } from '../controller/auth.controller.js'
const router=express.Router()
router.post("/signin",signin)
router.post("/signup",signup)
router.post("/logout",logout)

export default router