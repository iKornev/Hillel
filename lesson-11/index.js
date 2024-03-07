import express from 'express'
import { userRouter } from "./Routes/userRouter.js";
filmRouter
import { filmRouter } from "./Routes/filmRouter.js";
import {ErrorHandler} from './middleware/ErrorHandler.js'
import passport from 'passport'
import strategy from './middleware/passport-middleware.js'
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)
let database;




async function run() {
    try {

        database = client.db("films");

    } catch (e) {
        await client.close();
    }
}

run().then(() => {console.log('connected')})


const app = express()
app.use(express.json())
app.post('/insert', async (req,res, next) => {


    const movies = database.collection("films");

    const data = req.body

    // Create a document to insert
    const doc = {
        title: "some new Movies",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    // Insert the defined document into the "haiku" collection
    const result = await movies.insertOne(data);

    res.json({result})

})


app.put('/update/:id', async (req,res, next) => {


    const movies = database.collection("movies");


    const id = req.params.id
    console.log({id})
    // Create a document to insert
    const querry = {
        title: "some other Movies",
        content: "empty",
    }

    const result = await movies.updateOne({ _id: new ObjectId(id)  }, { $set: {
            title: "some other Movies",
            content: "empty",
        }});

    res.json({result})

})




app.use(express.json())
app.use( userRouter)
app.use(passport.initialize())
strategy(passport)
app.use((req, res, next) => next(new Error('Route Not Found')))
app.use(ErrorHandler)


// run().then(()=> {console.log('connected successfully')}).catch(() => {console.log('failed to  connect')})


// sequelize.sync().then(() => console.log('db is ready'))


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})