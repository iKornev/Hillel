import express from 'express';
import { MyEmitter } from "./emiter.js";

const app = express();
app.use(express.json());

app.get('/testRoute', (req, res) => {
    console.log('get route completed ');

    res.json({
        data: 'Hello world'
    })
});

app.post('/testpost', (req, res) => {
    console.log('post route completed ');

    res.json({
        data: 'Hello post'
    })
})

app.post('/emitter', (req, res) => {
    console.log({ req })

    MyEmitter.emit('someEvent', {field: []})

    res.json({
        data: 'Emitter completed'
    })
})


// const PORT = process.env.PORT || 3000;
//
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log(`dasdasda`)
// });

export { app };
