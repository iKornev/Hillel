import Joi from 'joi'

const userCreateValidationSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
}).required()


const userUpdateValidationSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
}).required()




export { userCreateValidationSchema, userUpdateValidationSchema }