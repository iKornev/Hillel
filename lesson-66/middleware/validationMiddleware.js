function validation (req, res ,next) {
    console.log({reqBody: req.body})

    const { body } = req

    if ( !body.password || !body.login) {
       next(new Error('vallidation Error'))
    }

    next()
}

export { validation }