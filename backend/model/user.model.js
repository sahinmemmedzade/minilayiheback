import mongoose, { Mongoose } from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        unique:true,
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
  address:{
    streetAddress:{
        type:String,
    },
    city:{
        type:String,
    }, 
    district:{
        type:String,
    }, 
    zipCode:{
        type:String,
    },
    country:{
        type:String,
    },
  }
})
const userModel=mongoose.model("User",userSchema)
export default userModel