import axios from 'axios';

async function getUser() {
    try {
        const result = await axios.get('http://jsonplaceholder.typicode.com/posts')

        const {data} = result

        if (data) {
            return data
        }

    } catch (error) {
        console.log({error})
    }
}


function getPosts() {
    return new Promise((resolve, reject) => {
        const posts  = axios.get('http://jsonplaceholder.typicode.com/posts')

     // reject('data not found')

        resolve(posts)
    })
}

export { getUser,getPosts  };