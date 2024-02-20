import { Router } from 'express';

const userRouter = new Router()

userRouter.get('/user', (req, res) => {
    res.send('some rosdacascascasuter resp')
})

userRouter.post('/user', (req, res) => {
    res.send('API for user creation')
})

export { userRouter }