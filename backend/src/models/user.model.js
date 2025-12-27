import moongoose from "mongoose";

const userSchema = moongoose.Schema(
    {
        email: {
            type: String, 
            required: true,
            unique: true,
        },
        fullName:{
            type: String,
            required: true,
        },
        password:{
            type: String, 
            required: true
        },
        profilePic:{
            type: String,
            default: ""
        }
    }
, {timestamps: true});


const User = moongoose.model("User", userSchema);

export default User;