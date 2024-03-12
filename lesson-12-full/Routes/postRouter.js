import { Router } from 'express';
import { PostModel } from "../MongoDBModels/Post.js";
import passport from "passport";


const postRouter = new Router()

postRouter.post('/post',  passport.authenticate('jwt-access', { session: false }),async (req, res) => {

    try {
        const { user } = req
        const data = req.body

        const postData = { ...data, owner: user.id   }

        const post = await PostModel.create(postData)

        res.status(201).json({
            post
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

postRouter.get('/post:id', passport.authenticate('jwt-access', { session: false }), async (req, res) => {
    try {

        const id = req.params.id;

        const post = await PostModel.findById(id).populate('owner');

        res.status(201).json({
            post
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

postRouter.delete('/post/:id', passport.authenticate('jwt-access', { session: false }), async (req, res) => {
    try {

        const id = req.params.id;

        console.log({ id })

        const post = await PostModel.deleteOne( {_id: id, owner: req.user.id})

        res.status(201).json({
            post
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

export { postRouter }