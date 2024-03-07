import { Router } from 'express';
import { PostModel } from "../MongoDBModels/Post.js";


const postRouter = new Router()

postRouter.post('/post', async (req, res) => {

    try {
        const postData = {
            title: 'new post',
            body: 'some post body',
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

postRouter.get('/post:id', async (req, res) => {

    try {

        const id = req.params.id;

        const post = await PostModel.findById(id);

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