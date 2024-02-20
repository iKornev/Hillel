import express from 'express'
import { recordsRouter } from "./routes/recordsRouter.js";
import { carRouter } from "./routes/carRouter.js";
import {ErrorHandler} from "./middleware/ErrorHandler.js";
import { validation } from "./middleware/validationMiddleware.js"


const app = express()
app.use(express.json())

app.use((req, res, next) => {
    console.log('work always')
    next()
})

app.all('/test', (req, res, next) => {
    console.log('completed for all test api')
    next()
})

app.post('/users', validation, (req, res) => {
    res.json({status: 'OK', data: req.body})
})

app.use(recordsRouter, carRouter)

app.get('/users', (req, res, next) => {
    console.log('user routes completed')
    throw new Error('some angry error')
    next()
}, (req, res) => {
    console.log('base url')

    res.json({
        user: 'Ivan',
        password: '1234'
    })
})

app.use(ErrorHandler)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

