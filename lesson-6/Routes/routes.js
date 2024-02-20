import { Router } from 'express';


const router = new Router()

router.get('/router', (req, res) => {
    res.send('some router resp')
})


export { router }