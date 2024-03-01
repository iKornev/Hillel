import Joi from 'joi'

const userSignUpSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


const userSignInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});




export { userSignUpSchema, userSignInSchema }