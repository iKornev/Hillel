import express from 'express'
import { router } from "./Routes/routes.js";
import { userRouter } from "./Routes/userRouter.js";


const app = express()
app.use(express.json())
app.use(router, userRouter)

app.use((req, res, next) => {
    console.log('completed always')
    next()
})


app.get('/test',(req, res,next  ) => {

   console.log('middleware that do somemething')
    // next()
},  (req, res) => {
    res.send('completed in secound function ')
}  )

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})