import mongoose from "mongoose";
const Categoryschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    }
})
const categoryModel=mongoose.model('Category',Categoryschema)
export default categoryModel