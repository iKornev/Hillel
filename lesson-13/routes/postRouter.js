const { Router } = require('express');
const CreatePost = require('../controller/postController')
const postRouter = new Router()

postRouter.post('/post', CreatePost)

module.exports = postRouter