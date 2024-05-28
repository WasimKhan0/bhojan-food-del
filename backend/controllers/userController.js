import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === "admin@gmail.com" && password === "1234") {
            return res.json({ success: true, message: "admin logged in" });
        }
        else {
            return res.json({ success: false, message: "incorrect credentials for admin" });

        }
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Err" });

    }

}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (err) {
        console.log(err)
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }

        if (password.length < 4) {
            return res.json({ success: false, message: "Please enter strong password" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (err) {
        console.log(err)
    }
}


const addWish = async (req, res) => {
    const { foodItem } = req.body;
    try {
        const user = await userModel.findById(req.body.userId);

        const itemIndex = user.wish.findIndex(item =>
            item.id === foodItem.id
        );

        if (itemIndex === -1) {
            user.wish.push(foodItem);
        } else {
            user.wish.splice(itemIndex, 1);
        }

        await user.save();

        return res.json({ success: true, data: user.wish });

    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error" });
    }
}
const getWishList = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, data: user.wish });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
const removeWish = async (req, res) => {
    const id = req.params.id;
    try {

        const user = await userModel.findById(req.body.userId);
         if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const arr = user.wish;
        const updatedList = arr.filter((it) => it.id !== id);
        user.wish = updatedList;
        user.save();
        return res.json({ success: true, data: user.wish });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};







export { loginUser, registerUser, loginAdmin, addWish, getWishList, removeWish }