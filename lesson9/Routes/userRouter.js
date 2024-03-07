import { Router } from 'express';
import { validator } from "../middleware/unifyValidator.js";
import  { userSignUpSchema, userSignInSchema } from "../validationSchemas/userValidationSchemas.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt-cofig.js'
import passport from 'passport'
import { User } from "../Models/User.js";

const userRouter = new Router()

const users = [];



userRouter.post('/signup', validator(userSignUpSchema), async (req, res) => {

    const existingUser = users.find(user => user.username === req.body.username);
    if (existingUser) return res.status(400).send({ error: 'User already exists' });

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };

        const user = await User.create(userData)

        console.log({user})

        const token = jwt.sign(
            {
                email: user.email,
                userId: user.id,
            },
            jwtConfig,
            { expiresIn: 3600 },
        )

        res.status(201).json({
            token: `Bearer ${token}`,
        })
    } catch (error) {
        console.log({error: error.message})
    }
})

userRouter.post('/signin', validator(userSignInSchema), async (req, res) => {
    console.log({ users })
    const user = users.find(user => user.username === req.body.username);
    if (!user) return res.status(401).send({ error: 'Invalid username or password' });

    try {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            {
                login: user.login,
                userId: user.id,
            },
            jwtConfig,
            { expiresIn: 3600 },
        )
        res.status(201).json({
            token: `Bearer ${token}`,
        })
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

userRouter.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {


   res.json({
       data: req.user
   })
});





export { userRouter }