import { Router } from 'express';
import { db } from '../db/dbConnection.js'
const filmRouter = new Router()

// console.log(db)
// const Film = db.collection("film");


filmRouter.post('/post', async (req, res) => {

    try {


        res.status(201).json({

        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

filmRouter.get('/post:id', async (req, res) => {

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

export { filmRouter }