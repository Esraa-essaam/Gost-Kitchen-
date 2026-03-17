const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
    },


    email:{
        type:String,
        required:true,
         minlength:15,
         unique: true, 
         lowercase: true
    },

    Password:{
        type:String,
        required:true,
        minlength:8

    },


    age:{
        type:Number,
        required:true,
        min:18,
    },

    isVerified: { 
        type: Boolean, 
        default: false 
    },

    role:{
     type:String,
     enum: ["Admin","Provider","Chef","Customer"],
     required:true,
    },

    documents: [String], 
    phone: {
        type: Number,
        required: true,
    }

},{timestamps:true});

const User= mongoose.model("user",UserSchema)

module.exports=User;