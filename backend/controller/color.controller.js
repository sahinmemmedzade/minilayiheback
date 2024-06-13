import Color from '../model/color.model.js'
import checkValidColor from '../routes/utils/checkValidColor.js'
export const getColors=async (request,response)=>{
    const colors=await Color.find()
    response.status(200).send(colors)
}
export const addColor=async(request,response)=>{
const {name,hex}=request.body
if(!name || !hex){
    return response.status(400).send({error:"Please fill all fields"})
}
const validColor=checkValidColor(hex)
if(!validColor){
    return response.status(400).send({error:" Please enter a valid color"})

}
const existingColorName=await Color.findOne({name})
if(existingColorName){
    return response.status(400).send({error:" Colorname already exist.Please add a new color "})

}
const existingColorHex=await Color.findOne({hex})
if(existingColorHex){
    return response.status(400).send({error:" Colorvalue already exist.Please add a new color value "})

}
const newcolor=await Color.create({name,hex})
response.status(201).send(newcolor)
}