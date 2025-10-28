import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        default:'user',
        enum:['user','moderator','admin']
    },
    skills:[String]
},{timestamps:true})

export const userModel = mongoose.model('user',userSchema)