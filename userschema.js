import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    skills: {
        type:String
    }
});

export const User = mongoose.model('User', userSchema);
