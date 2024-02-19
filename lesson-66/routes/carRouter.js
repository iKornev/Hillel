import { Router } from 'express'

const carRouter = new Router()

function getCar (req, res) {
    res.json({
        id: 4,
        data: 'some data car'
    })
}

carRouter.use((req, res, next) => {
    console.log('car router middleware')
    next()
})

carRouter.get('/car', getCar )


export { carRouter }



