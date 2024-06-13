import Product from '../model/Product.model.js'
import Size from '../model/size.model.js'
import Color from '../model/color.model.js'


export const getProducts=async (request,response)=>{
    const product=await Product.find()
    response.status(200).send(product)
    if(!product){
        return response.status(404).send({error:'No product found'})
    }
}
export const getSingleProduct=async (request,response)=>{
    const{productid}=request.params
    const singleproduct=await Product.findById(productid)
    if(!singleproduct){
        return response.status(404).send({error:'No product found'})
    }
    response.status(200).send(singleproduct)
}
export const addSingleProduct=async (request,response)=>{
    const {title,price,category,slug,description,sku,size,color,quantity}=request.body
    const {path}=request.file
    if(!title||!price||!category||!slug||!description||!quantity||!size||!color||!sku){
        return response.status(400).send({error:'Please fill all required fields'})
    }
    if(!path){
        return response.status(400).send({error:'Please upload an image'})
    }
    const existingSpecificProduct = await Product.findOne({sku}).populate("stock.color").populate("stock.size");


const givenColor = await Color.findOne({_id: color});
const givenSize = await Size.findOne({_id: size});


if(existingSpecificProduct){
    const existingSpecificProductInStock = existingSpecificProduct.stock.some((stockItem) => {
        return (
            stockItem.size.name === givenSize.name && stockItem.color.name === givenColor.name
        );
    
})
if(existingSpecificProductInStock){
    const stockindex=existingSpecificProduct.stock.findIndex((stockItem) => {
        return (
            stockItem.size.name === givenSize.name && stockItem.color.name === givenColor.name
        );
})
existingSpecificProduct.stock[stockindex].quantity = +existingSpecificProduct.stock[stockindex].quantity + + quantity
await existingSpecificProduct.save()
return response.status(200).send(existingSpecificProduct)}
if(!existingSpecificProductInStock){
    existingSpecificProduct.stock.push({quantity,size,color})
    await existingSpecificProduct.save()
    return response.status(201).send(existingSpecificProduct)
}
}
// const uptatedProduct=await Product.findOneAndUpdate({sku})

   
const stock=[{quantity,size,color}]
const newProduct=await Product.create({title,price,sku,category,slug,description,stock,productPic:path})
response.status(200).send(newProduct)
}