import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body;
    try {

        if(!email || !fullName || !password){
            return res.status(400).json({message: "all fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters long"});
        }

        const user = await User.findOne({email});// search for that email is there or not..

        if(user){
            return res.status(400).json({message: "Email already there. Move to Login process"});
        }

        // we have to hash the password.
        const salt = await bcrypt.genSalt(10);//value that can't be read and to be crypted with password hide.
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            // generate jwt token here ..
            generateToken(newUser._id, res);
            await newUser.save();// save kardenge user ko database me..

            // save krne ke baad bhejenge bhi to..
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic:newUser.profilePic
            });
        }else{
            return res.status(400).json({message: "Invalid User data!"});    
        }
    } catch (error) {
        console.log("error in signup", error.message);
        res.status(500).json({message: "Internal Server Error.."});
    }
};

export const login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid!!"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid!! Wrong Password.."});
        }

        //server ke pas token ke form me jayega..
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Login Error!!!", error.message);
        res.status(500).json({message: "Internal Server Error.."});        
    }
};

export const logout = (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged Out >>>"});
    } catch (error) {
        console.log("Logout Error!!!", error.message);
        res.status(500).json({message: "Internal Server Error.."});
    }
};

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "profile pic is missing.."});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: uploadResponse.secure_url},
            {new: true}
        )

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in upload profile pic",error.message);
        res.status(500).json({message: "Internal Server Error.."});
    }
};

export const checkAuth = async (req,res) => {
    try {
        res.status(200).json(req.user);// send the user back to client. this will give back a authenticated user..
    } catch (error) {
        console.log("Error in checkAuth", error.message);
        res.status(500).json({message: "Internal Server Error.."});
    }
};
