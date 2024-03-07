import { Router } from 'express';
import { PostModel } from "../MongoDBModels/Post.js";
import passport from "passport";


const postRouter = new Router()

postRouter.post('/post', passport.authenticate('jwt-access', { session: false }), async (req, res) => {

    try {
        const { user } = req

        const postData = {
            title: 'new post',
            body: 'some post body',
            owner: user.id
        }

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

postRouter.get('/post/:id', passport.authenticate('jwt-access', { session: false }),async (req, res) => {

    try {
        const id = req.params.id;

        const post = await PostModel.findById(id).populate('owner');

        if (!post) {
            res.status(404).json({
                error: 'post not found'
            })

        } else {
            res.status(201).json({
                post
            })
        }


    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

postRouter.delete('/post/:id', passport.authenticate('jwt-access', { session: false }),async (req, res) => {

    try {
        const id = req.params.id;

        const post = await PostModel.deleteOne({_id:id});

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