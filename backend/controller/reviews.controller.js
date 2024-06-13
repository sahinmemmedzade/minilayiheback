import Review from '../model/review.model.js'
export const getSpecificReview = async (request, response) => {
    const { productid } = request.params;
    
        const specificReviews = await Review.find({ productid });
        if (!specificReviews) {
            return response.status(400).send({ error: "No reviews found for the specified product" });
        }
        response.status(200).send(specificReviews);
  
     
    
};
export const getReviews=async (request,response)=>{
    const reviews=await Review.find()
    if(!reviews){
        return response.status(404).send({error:"something went wrong"})
    }
    response.status(200).send(reviews)
}
export const addReview=async (request,response)=>{
    const{_id:userId}=request.user
    const{rating,comment,productid}=request.body
    if(!rating||!comment||!productid){
        return response.status(404).send({error:"Please fill all fields"})
    }
    const newReview=await Review.create({
        userId,
        productid,
        rating,
        comment
    })
    if(!newReview){{
        return response.status(404).send({error:"something went wrong"})
    }}
    return response.status(201).send(newReview)
}