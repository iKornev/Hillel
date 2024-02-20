import express from 'express'
import { router } from "./Routes/routes.js";
import { userRouter } from "./Routes/userRouter.js";

const app = express()
app.use(express.json())
app.use(router, userRouter)


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})