import { Router } from 'express';
import { validator } from "../middleware/unifyValidator.js";
import  { userSignUpSchema, userSignInSchema } from "../validationSchemas/userValidationSchemas.js";
import bcrypt from 'bcrypt'

const userRouter = new Router()

const users = [];


userRouter.post('/signup', validator(userSignUpSchema), async (req, res) => {

    const existingUser = users.find(user => user.username === req.body.username);
    if (existingUser) return res.status(400).send({ error: 'User already exists' });

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            id: users.length + 1,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };
        users.push(user);

        res.json({user})
    } catch (error) {
        res.status(500).send({ error: 'Error hashing password' });
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
        res.status(200).send({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});




export { userRouter }