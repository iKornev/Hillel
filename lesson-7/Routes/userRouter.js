import { Router } from 'express';
import { validation } from "../middleware/validationMiddleware.js";
import { validator } from "../middleware/unifyValidator.js";
import { userCreateValidationSchema, userUpdateValidationSchema } from "../validationSchemas/userValidationSchemas.js";
import bcrypt from 'bcrypt'

const userRouter = new Router()
let user = null

const paswordHashFromBD =  '$argon2id$v=19$m=65536,t=3,p=4$Te3VDDb2+jAB/OL0uC0ncg$4ur+Qa9JVZpgVMFg0UY2J0GB3wXWfPTWlCTr8GkCZR0'

userRouter.get('/user', (req, res) => {
    res.send('some rosdacascascasuter resp')
})

userRouter.put('/user', validator(userUpdateValidationSchema), (req, res) => {
    res.send('API for user update')
})

userRouter.post('/user', validator(userCreateValidationSchema), async (req, res) => {

    const {password, username} = req.body

    // const obj = {
    //     username: "john_doe",
    //     email: "john@example.com",
    //     password: "qwery123"
    // }




    const saltRounds = 10;
    const result = await bcrypt.hash(password, saltRounds)

    console.log({result})
    res.send('API for user creation')
})

userRouter.post('auth/user', validator(userCreateValidationSchema), async (req, res) => {


    const {password, username} = req.body

    try {
        const result = await argon2.verify(paswordHashFromBD, password)
        if (result) {
            console.log('password match')
        } else {
            console.log(' password did not match')
        }
    } catch (err) {
        console.log({err})
    }
    console.log({hash})


    res.send('API for user creation')
})






export { userRouter }