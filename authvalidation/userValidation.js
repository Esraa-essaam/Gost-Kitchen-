const joi = require("joi")


// becouse we get data from user
const createuser = joi.object({
    name: joi.String().required().min(7),
    email: joi.String().required().min(15).unique().lowercase(),
    password: joi.String().required().min(8),
    age: joi.Number().required().min(18),
    role:joi.String().required().enum(Admin,Provider,Chef,Customer),
    document:joi.String(),
    phone:joi.Number().required()
});

// because we update (get) data from user 
const updateuser = joi.object({
    name: joi.String().required().min(7),
    email: joi.String().required().min(15).unique().lowercase(),
    password: joi.String().required().min(8),
    age: joi.Number().required().min(18),
    role:joi.String().required().enum(Admin,Provider,Chef,Customer),
    document:joi.String(),
    phone:joi.Number().required()
});

