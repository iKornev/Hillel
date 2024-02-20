// let express = require('express')
import express from 'express';

let app = express()

app.use(express.json())

app.get('/', function (req, res) {
    console.log('get endpoint completed')
    res.send('hello world')
})

app.get('/user')

    app.post('/users', function (req, res, next) {

    console.log({body: req.body})
    console.log('post endpoint completed')
    res.send('hello post')
})

app.delete('/delete', () => {})

app.listen(3000,() => {
    console.log('App listening on port 3000')
})

const resp = {
    status: 200,
    data : {

    }
}