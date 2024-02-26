import express from 'express'
import { userRouter } from "./Routes/userRouter.js";
import {ErrorHandler} from './middleware/ErrorHandler.js'
import passport from 'passport'
import strategy from './middleware/passport-middleware.js'

const app = express()
app.use(express.json())
app.use( userRouter)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use(passport.initialize());
strategy(passport)

app.use((req, res, next) => next(new Error('Route Not Found')))

app.use(ErrorHandler)



app.listen(3000, () => {
    console.log('Server listening on port 3000')
})