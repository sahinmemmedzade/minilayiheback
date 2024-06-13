import Size from '../model/size.model.js'
import isvalidsize from '../routes/utils/chechkvalidsize.js'
export const getSizes=async (request,response)=>{
    const sizes=await Size.find()
return response.status(201).send(sizes)
}
export const addSize=async(request,response)=>{
    const {name}=request.body
    if(!name){
        return response.status(404).send({error:"Please fill all fields"})
    }
    const isvalid=isvalidsize(name)
    if(!isvalid){
        return response.status(404).send({error:"Invalid size"})
    }
    const existingsize=await Size.findOne({name})
    if(existingsize){
        return response.status(404).send({error:"Size already exists"})
    }
    const newsize=await Size.create({name})
    return response.status(201).send(newsize)
}