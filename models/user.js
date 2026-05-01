import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{  
        type: String,
        required: true,  
        unique: true
    },
    Password:{
        type: String,
        required: true,
    },
    Firstname:{
        type: String,
        required: true,
    },
    Lastname:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        default: "Customer"
    },
    Whatsapp:{
        type: String,
    },
    Phone:{
        type: String,
    },
    dissabled:{
        type: Boolean,
        required: true,
        default: false
    },
    emailVerified:{
        type: Boolean,
        required: true,
        default: false
    },
    
});

const User =  mongoose.model('users', userSchema);
export default User;