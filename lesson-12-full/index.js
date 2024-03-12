import express from 'express'
import { userRouter } from "./Routes/userRouter.js";
import { postRouter } from "./Routes/postRouter.js";
import {ErrorHandler} from './middleware/ErrorHandler.js'
import passport from 'passport'
import strategy from './middleware/passport-middleware.js'
import mongoose from 'mongoose';
import { mongoURI } from "./config/mongodb-config.js";
import nodemailer from 'nodemailer'
import pug from 'pug'


// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "ik0077ik25@gmail.com",
//         pass: "axubpbjiwlofzxkz",
//     },
// });







const app = express()

app.set('view engine', 'pug');


// async function main() {
//
//     const html = pug.renderFile('./views/index.pug', { resetUrl: '' });
//
//
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: 'ik0077ik25@gmail.com', // sender address
//         to: "ivan@siema.com.ua", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: html, // html body
//     });
//
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }
//
// main().catch(console.error);

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

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