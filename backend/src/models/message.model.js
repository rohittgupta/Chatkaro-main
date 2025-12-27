import moongoose from "mongoose";
import User from "./user.model.js";

const messageSchema = moongoose.Schema(
    {
        senderId: {
            type: moongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: User,
            
        },
        receiverId:{
            type: moongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: User,
            
        },
        text:{
            type: String, 
        },
        image:{
            type: String,
        }
    }
, {timestamps: true});


const Message = moongoose.model("Message", messageSchema);

export default Message;