const Joi=require('joi');

const userSchemas ={
    User: Joi.object().keys({
        username:Joi.string().min(5).required(),
        emailid: Joi.string().min(10).required().email(),
        password:Joi.string().min(8).required()
    })
}

module.exports={userSchemas};