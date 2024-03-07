const validator = (validationSchema) => (req, res ,next) => {

    const { body } = req
    const validationResult = validationSchema.validate(body)

    console.log({reqBody: req.body, validationResult})

    if(validationResult.error) {
        next(new Error(validationResult.error.message))
    }

    next()
}

export { validator }