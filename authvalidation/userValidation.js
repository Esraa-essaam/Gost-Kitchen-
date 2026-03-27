const joi = require("joi")
// const UserController = require('../controllers/usercontroller')


// becouse we get data from user
const registerSchema = joi.object({
    name: joi.string().required().min(7).max(30),
    email: joi.string().required().min(15).lowercase().trim().email(),
    password: joi.string().required().min(8),
    role:joi.string().required().valid('client', 'chef', 'admin'),
    phone: joi.string().required().length(11),
    address:joi.string().required()
});


const joi = require("joi");

const loginSchema = joi.object({
    email: joi.string()
        .email()
        .required()
        .lowercase()
        .trim(),
        
    password: joi.string()
        .required()
        
});

const logoutSchema = joi.object({
    
});

module.exports = {
    registerSchema, 
    loginSchema,
    logoutSchema
};