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
         minlength:7,
         unique: true, 
        lowercase: true,
         trim:true
    },

    password:{
        type:String,
        required:true,
        minlength:8

    },
    
    role:{
     type:String,
     enum: ['client', 'chef', 'admin'],
     required:true,
    },

    phone: {
        type: String,
        required: true,
    },

    address:{
        type:String,
        required:true,
        
    },



},{timestamps:true});

const User= mongoose.model("user",UserSchema)

module.exports=User;