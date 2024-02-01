import { getUser, getPosts } from "./request.js";

async function getDateFromServer() {

    const users = await getUser()

    console.log({users})

}

async function getPostsFromServer() {

    const posts = getPosts()

    posts.then((result)=> {
        console.log({result: result.data})
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        console.log('completed any way ')
    })

}

getPostsFromServer()