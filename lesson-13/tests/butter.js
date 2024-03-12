const butter = (flag) => {

    if (flag) {
        return new Promise((res,rej) => {
            res('арахисовое масло')
        })
    }

    return new Promise((res,rej) => {
        rej('error')
    })

}

module.exports = butter

