const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../utils/userValidation");

const register = async (req, res) => {
    try {
        
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'wrong data pls try agian' });
        }

       const userExists = await User.findOne({ email: value.email });
        if (userExists) {
            return res.status(400).json({ message: "this user already exist" });
        }
       
        const hashedPassword = await bcrypt.hash(value.password, 10);

        const newUser = await User.create({
            ...value, 
            password: hashedPassword 
        });

        
        res.status(201).json({
            message: 'wlc. now you have an account.',
            user: {
                id: newUser._id,
                name: newUser.name,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: " server error"});
    }
};


     const login = async (req, res) => {
    try {

       const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: 'wrong data pls try agian' });

        
        const user = await User.findOne({ email: value.email });
        if (!user) {
            return res.status(401).json({ message: "This account not exist. try again" });
        }

        
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "there is a mistake at your password" });
        }

        
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } 
        );

        
        res.status(200).json({
           message: "sucess try",
           token
        });

    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
};
const logout = async (req, res) => {
    try {
        
        res.status(200).json({ 
            message: "Logged out successfully. See you soon!" 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during logout" });
    }
};



 
module.exports = {
   register,
   login,
   logout
}