const User = require("../models/User");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

const createuser = async (req,res) =>{

   //to identify the information needed
   const{name,email,Password,age,isVerified,role,documents}=req.body

   try{
      if(!name||!email||!Password||!age||!isVerified||!role||!documents){
         return res.status(400).json({msg:"Please provide all required fields"})}


    const userexist = await User.findOne({email: req.body.email})
      if (userexist) {
         return res.status(400).json({msg:"user already found "});
      }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
         

   const newuser= await User.create ({
      ...req.body,
      Password: hashedPassword
   });

   const token = jwt.sign(
       { id: newuser._id, role: newuser.role },
         process.env.JWT_SECRET, 
         { expiresIn: "30d" }
            );
   
      
    res.status(201).json({ 
            msg: "Success process, you created an account", 
            token, 
            user: { name: newuser.name, email: newuser.email } 
        });

      
      }
catch(error){
    res.status(500).json({ msg: "Server Error", error: error.message });
}
}



const updateuser = async(req,res) =>{
   try{
      if (req.body.Password) {
            const salt = await bcrypt.genSalt(10);
            req.body.Password = await bcrypt.hash(req.body.Password, salt);
        }

      const newdata = await User.findByIdAndUpdate(req.params.id,req.body ,{
         new:true,
         runvalidator:true
      });

      if (!newdata) return res.status(404).json({ msg: "User not found" });
      return res.status(201).json ({msg:"you updated your data"})
   }
   catch(error){
      return res.status(400).json({msg:"Wrong Data , pls try again later"}) 

   }
} 
const getuserdata = async (req,res) =>{
   try{
      const getuserdata = await User.findById(req.params.id)
       res.status(201).json({msg:"found the user "})
   }
   catch(error){
      return res.status(400).json({msg:"user not found"})

   }
}

const deleteuser = async (req,res) =>{
   try{
      const deleteuser = await User.findByIdAndDelete(req.params.id)
       res.status(201).json({msg:"you deleted the account"})
   }
   catch(error){
      return res.status(400).json({msg:"error "})

   }
}



 
module.exports = {
   createuser,
   updateuser,
   getuserdata,
   deleteuser
}