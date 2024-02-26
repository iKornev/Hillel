function ErrorHandler (err, req, res, next) {
    if (err) {
        console.log(err.message)
        res.json({
            erreorMessage: err.message
        })
    }
}

export {ErrorHandler}