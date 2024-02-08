import express from 'express'

const app = express()
app.use(express.json());


app.get('/test', function (req, res) {

    console.log('edwdew')
    res.send('Hello World')
})


app.post('/test', (req, res) => {
    res.send('Hello World')
})


export { app }