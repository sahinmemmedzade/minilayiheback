import Category from '../model/category.model.js'
export const getCategories=async (request,response)=>{
const categories=await Category.find()
    response.status(200).send(categories)
}
export const addCategory=async (request,response)=>{
    const {name,slug}=request.body
    if(!name || !slug){
        return response.status(400).send({error:'Please fill all required fields'})
    }
    const existingCategoryName=await Category.findOne({name})
    if(existingCategoryName){
 return response.status(400).send({error:'Category name already exists'})
    }
    const existingCategorySlug=await Category.findOne({name})
    if(existingCategorySlug){
 return response.status(400).send({error:'Category slug already exists'})
    }
    const newcategory=await Category.create({name,slug})
    response.status(201).send(newcategory)
}

