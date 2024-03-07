import Joi from 'joi'


function validation (req, res ,next) {

    const userValidationSchema = Joi.object({
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

    const { body } = req
    const validationResult = userValidationSchema.validate(body)



    console.log({reqBody: req.body, validationResult})

    if(validationResult.error) {
        next(new Error(validationResult.error.message))
    }


    next()
}

export { validation }