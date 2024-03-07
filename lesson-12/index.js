import express from 'express'
import { userRouter } from "./Routes/userRouter.js";
import { postRouter } from "./Routes/postRouter.js";
import {ErrorHandler} from './middleware/ErrorHandler.js'
import passport from 'passport'
import strategy from './middleware/passport-middleware.js'
import mongoose from 'mongoose';
import { mongoURI } from "./config/mongodb-config.js";

const app = express()
app.use(express.json())
app.use( userRouter, postRouter)
app.use(passport.initialize())
strategy(passport)
app.use((req, res, next) => next(new Error('Route Not Found')))
app.use(ErrorHandler)

mongoose.connect(mongoURI)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Failed to connect to mongo'))

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})