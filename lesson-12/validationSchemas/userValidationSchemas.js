import Joi from 'joi'

const userSignUpSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.number().required(),
});
//
//
//
//
// const roles = {
//     'admin': 1,
//     'user': 0
// }

const userSignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});




export { userSignUpSchema, userSignInSchema }