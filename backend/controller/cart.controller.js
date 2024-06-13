import Cart from '../model/cart.model.js'
import Size from '../model/size.model.js'
import Color from '../model/color.model.js'
import Product from '../model/Product.model.js'
export const getCart=async (request,response)=>{
    const {_id:userId}=request.user
    const cart =await Cart.findOne({userId})
    if(!cart) {
    return response.status(404).send({error:"something went wrong"})
    }
response.status(200).send(cart)
}
export const addCart = async (request, response) => {
    const { _id: userId } = request.user;
    const { productId, color, size, quantity, price } = request.body;

    if (!productId || !color || !size || !quantity || !price) {
        return response.status(404).send({ error: "Please fill all fields" });
        
    }

    const newcartItem = {
        productId,
        color,
        size,
        quantity,
        price
    };

    try {
        const existingUserCart = await Cart.findOne({ userId })?.populate('cartItems.size').populate('cartItems.color').populate("cartItems.productId");
        const givenColor = await Color.findOne({_id: color});
        const givenSize = await Size.findOne({_id: size});
        const givenProduct=await Product.findOne({_id: productId});
        if (existingUserCart) {
            const existingSpecificCartItem = existingUserCart.cartItems.some((cartItem) => {
                return (
                    cartItem.size.name === givenSize.name && cartItem.color.name === givenColor.name && cartItem.productId.sku ===givenProduct.sku
                );
            
        })
        if(existingSpecificCartItem){
            const cartIndex= existingUserCart.cartItems.findIndex((cartItem) => {
                return (
                    cartItem.size.name === givenSize.name && cartItem.color.name === givenColor.name && cartItem.productId.sku ===givenProduct.sku
                );
            
        })  
        existingUserCart.cartItems[cartIndex].quantity = +existingUserCart.cartItems[cartIndex].quantity + + quantity
await existingUserCart.save()
return response.status(200).send(existingUserCart)
        }
            existingUserCart.cartItems.push(newcartItem); // Corrected push
            await existingUserCart.save();
            return response.status(202).send(existingUserCart);
        }

        const newcart = await Cart.create({ userId, cartItems: [newcartItem] });
        if (!newcart) {
            return response.status(404).send({ error: "New cart cannot be created" });
        }
        response.status(201).send(newcart);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
};