import { Router } from 'express';
import { validator } from "../middleware/unifyValidator.js";
import  { userSignUpSchema, userSignInSchema } from "../validationSchemas/userValidationSchemas.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { accessJwtConfig, refreshJwtConfig } from '../config/jwt-cofig.js'
import passport from 'passport'
import User from "../MongoDBModels/User.js";

const userRouter = new Router()

userRouter.post('/signup', validator(userSignUpSchema), async (req, res) => {
    console.log('signup', {body: req.body})

    const existingUser = await User.findOne({email: req.body.email})

    console.log({ existingUser })
    if (existingUser) {
        return res.status(400).send({ error: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };
        const user = await User.create(userData)

        console.log({user})

        const accessToken = jwt.sign(
            {
                email: user.email,
                userId: user.id,
            },
            accessJwtConfig,
            { expiresIn: 3600 },
        )

        const refreshToken = jwt.sign(
            {
                email: user.email,
                userId: user.id,
            },
            refreshJwtConfig,
            { expiresIn: 36000 },
        )

        res.status(201).json({
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

userRouter.post('/signin', validator(userSignInSchema), async (req, res) => {

    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(401).send({ error: 'User not found' });


        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            {
                login: user.login,
                userId: user.id,
            },
            accessJwtConfig,
            { expiresIn: 3600 },
        )
        res.status(201).json({
            token: `Bearer ${token}`,
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

userRouter.get('/me', passport.authenticate('jwt-access', { session: false }), async (req, res) => {
    res.status(201).json({
        user: req.user,
    })
});

userRouter.get('/refresh-token', passport.authenticate('jwt-refresh', { session: false }), async (req, res) => {
    const user = req.user

    const accessToken = jwt.sign(
        {
            email: user.email,
            userId: user.id,
        },
        accessJwtConfig,
        { expiresIn: 3600 },
    )

    const refreshToken = jwt.sign(
        {
            email: user.email,
            userId: user.id,
        },
        refreshJwtConfig,
        { expiresIn: 3600 },
    )

    res.status(201).json({
        accessToken,
        refreshToken
    })
});





export { userRouter }