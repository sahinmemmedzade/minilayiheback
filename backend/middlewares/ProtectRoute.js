import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const protectRoute = async (request, response, next) => {
    const token = request.cookies.jwt;
    if (!token) {
        return response.status(400).send({ error: "No token provided - Unauthorized user" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        if (!user) {
            return response.status(400).send({ error: "User not found - Invalid user" });
        }
        request.user = user;
        next();
    } catch (err) {
        return response.status(400).send({ error: "Invalid token - Unauthorized user" });
    }
};
