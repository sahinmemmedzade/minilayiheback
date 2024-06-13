import express from'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import Authroute from'./routes/auth.routes.js'
import CartRoute from'./routes/cart.routes.js'
import ColorRoute from'./routes/color.routes.js'
import CategoryRoute from './routes/category.routes.js'
import ProductRoute from './routes/product.routes.js'
import ReviewRoute from'./routes/review.routes.js'
import SizeRoute from'./routes/size.routes.js'
import OrderRoute from'./routes/order.routes.js'
import multer from 'multer'
const app=express()
dotenv.config()
const PORT=process.env.PORT
const Mongodb_Url=process.env.MongoDb_url
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });
app.use(cookieParser())
app.use(express.static('./'))
app.use(express.json())
app.use("/api/auth",Authroute)
app.use("/api/products", upload.single("productPic"), ProductRoute)
app.use("/api/carts",CartRoute)
app.use("/api/colors",ColorRoute)
app.use("/api/sizes",SizeRoute)
app.use("/api/reviews",ReviewRoute)
app.use("/api/orders",OrderRoute)

app.use("/api/categories",CategoryRoute)


app.listen(PORT,()=>{
    mongoose.connect(Mongodb_Url).then(()=>{
        console.log(`database connected and listening on ${PORT}`);
    }).catch((error)=>{
    console.log(error);
})})
