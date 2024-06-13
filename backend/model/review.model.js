import mongoose from "mongoose";
const reviewSchema=mongoose.Schema({
   userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   productid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Product"
   },
   rating:{
    type:Number,
    min:1,
    max:5,
required:true
},
comment:{
    type:String,
    required:true
}
},{timestamp:true})
const reviewModel=mongoose.model("Review",reviewSchema)
export default reviewModel