const validator = (validationSchema) => (req, res ,next) => {

    console.log({body: req.body})

    const { body } = req
    const validationResult = validationSchema.validate(body)

    console.log({reqBody: req.body, validationResult})

    if(validationResult.error) {
        next(new Error(validationResult.error.message))
    }

    next()
}

module.exports = {validator}