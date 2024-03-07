import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri)

let db;

async function run() {
    try {
        let db;
        db = client.db('movies');
        return db
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run()
    .then((databaseConnection)=> {

        db = databaseConnection
    })
    .catch(() => {console.log('failed to  connect')})


export {
    db,
}