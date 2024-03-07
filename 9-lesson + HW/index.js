import express from 'express'
import { userRouter } from "./Routes/userRouter.js";
import {ErrorHandler} from './middleware/ErrorHandler.js'
import passport from 'passport'
import strategy from './middleware/passport-middleware.js'
import sequelize from './config/sequelize-config.js'



const app = express()
app.use(express.json())
app.use( userRouter)
app.use(passport.initialize())
strategy(passport)
app.use((req, res, next) => next(new Error('Route Not Found')))
app.use(ErrorHandler)



sequelize.sync().then(() => console.log('db is ready'))


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})