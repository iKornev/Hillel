import axios from 'axios'

// task1
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
]


async function getDataSequentially(urls) {
    const urlsPromises = urls.map(url => axios.get(url))
    const result = []

    for  ( const urlPromise of urlsPromises ) {
         const { data } = await urlPromise
        result.push(data)
    }

    return result
}

const executor = async (urls) => {
    const result = await getDataSequentially(urls)

    console.log({ result })
}

// executor(urls)


//Task 2
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
    { username: 'admin', password: 'admin123' }
];

function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {

        const user = users.find(user => user.username === username && user.password === password)

        if (user) {
            resolve(user);
        } else {
            reject(new Error('User not found or password is invalid'));
        }
    });
}

authenticateUser('user1', 'password1')
    .then(user => {
        console.log('user authenticated', user);
    })
    .catch(error => {
        console.error('Authentication failed:', error.message);
    });





