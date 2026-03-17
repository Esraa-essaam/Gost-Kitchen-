require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");

const app = express()
app.use(express.json());

app.use("/api/users", userRouter);
app.spece("/api/space",spaceRouter);

async function dbconnction() {
    try{
        await mongoose.connect("mongodb//127.0.0.0.1:27017/new-app")
        
        console.log("connected")
    }
    catch(error){
        console.log("error")
    }
    
}


 dbconnction()

const PORT =process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`);
});