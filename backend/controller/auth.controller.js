import bcrypt from 'bcrypt';
import User from '../model/user.model.js';
import { generateTokenAndSetCookie } from '../generatetokenandsetcookie.js';
import Cart from '../model/cart.model.js';

export const signup = async (request, response) => {
    try {
        const { fullName, password, email } = request.body;
        if (!fullName || !password || !email) {
            return response.status(400).send({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return response.status(400).send({ message: "Already have an account" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, fullName, password: hashedPassword });
        if(!newUser){
            return response.status(404).send({ message: "User not created" });
        }
        await Cart.create({id: newUser.id,cartItems:[]})
        generateTokenAndSetCookie(newUser._id, response);
        response.status(201).send(newUser);
    } catch (error) {
        console.error(`Error during signup: ${error}`);
        response.status(500).send({ message: "Signup error" });
    }
};

export const signin = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({ error: "Please fill all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).send({ error: "Incorrect email or password" });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return response.status(400).send({ error: "Incorrect email or password" });
        }
        generateTokenAndSetCookie(user._id, response);
        response.status(200).send(user);
    } catch (error) {
        console.error(`Error during signin: ${error}`);
        response.status(500).send({ message: "Login error" });
    }
};

export const logout = (request, response) => {
    response.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    response.status(200).send({ message: "Logged out successfully" });
};
