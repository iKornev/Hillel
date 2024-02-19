import { Router } from 'express'

const recordsRouter = new Router()

recordsRouter.get('/records', (req, res) => {
    res.json({
        id: 1,
        data: 'some date here'
    })
})


export { recordsRouter}



