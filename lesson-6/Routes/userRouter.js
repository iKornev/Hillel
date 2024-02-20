import { Router } from 'express';

const userRouter = new Router()

userRouter.get('/user', (req, res) => {
    res.send('some rosdacascascasuter resp')
})


export { userRouter }