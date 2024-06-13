import mongoose from "mongoose";
const stockitem=mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Color"   
    },
    
    size:
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Size"
        }
    
})
const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true,
        unique: true,
    },
   
   
    productPic:{
        type:String,
        required:true
    },
   
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Review",
            default:[]
        }
    ]
    ,
    stock:[stockitem]
})
const productModel=mongoose.model("Product",productSchema)
export default productModel

{
    quantity:5;
    color:'1';
    
    size:'1'
}