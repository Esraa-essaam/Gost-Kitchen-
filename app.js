require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./Router/userRouter");
const kitchenRoutes = require("./routes/kitchenRoutes");

const app = express()
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/kitchens", kitchenRoutes);

async function dbconnction() {
    try{
        await mongoose.connect(process.env.DB_URL)
        
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