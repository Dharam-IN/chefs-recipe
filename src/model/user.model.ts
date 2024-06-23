import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    restaurant: string;
    gender: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean
}


const User: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please Enter Valid Email Address"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    restaurant: {
        type: String,
    },
    gender: {
        type: String,
        required: [true, "Please Choose Your Gender"],
    },
    verifyCode: {
        type: String,
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required"],
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


const UserModel = mongoose.models.User as mongoose.Model <User> || mongoose.model<User>("User", User)

export default UserModel;