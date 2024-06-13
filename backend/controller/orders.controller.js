import Order from "../model/order.model.js"
export const getSingleOrder=async(request,response)=>{
    const {userId}=request.params
    const order=await Order.findOne({userId})
    if(!order){
        return response.status(404).send({error:'Something went wrong'})
    }
    response.status(200).send(order)

}
export const getOrders=async (request,response)=>{
    const orders=await Order.find()
    if(!orders){
        return response.status(404).send({error:'Something went wrong'})
    }
    response.status(200).send(orders)
}
export const addOrder=async (request,response)=>{
    
  
}