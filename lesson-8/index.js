import express from 'express'
import { userRouter } from "./Routes/userRouter.js";
import {ErrorHandler} from './middleware/ErrorHandler.js'
import passport from 'passport'
import strategy from './middleware/passport-middleware.js'



const app = express()
app.use(express.json())
app.use( userRouter)
app.use(passport.initialize())
strategy(passport)
app.use(ErrorHandler)


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})