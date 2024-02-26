function ErrorHandler (err, req, res, next) {
    if (err) {
        console.log(err.message, err.status)

        res.status(err.status).json({
            erreorMessage: err.message
        })
    }
}

export {ErrorHandler}