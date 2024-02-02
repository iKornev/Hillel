import axios from "axios";


function sleep (ms) {
    return new Promise((resolve, reject) => {
        console.log('waiting for 3000 ms ')
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

async function getUser() {
    try {

        await sleep(4000)
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        return response

    } catch (error) {
        console.error(error);
    }
}


async function race () {

    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 3000);
    });

    const  resultPromise =  getUser()

    const result = await Promise.race([resultPromise, timeoutPromise]);

    if (result !== null) {
        const { data } = result;

        console.log({data})
        return data;


    } else {
        console.log({result})
        return result
    }
}

race()




// function sleep (ms) {
//
// }

// function cb () {
//     console.log('cb')
// }
//
// setTimeout(cb, 2000)


// async function getData() {
//     const count  = 2+3
//     // await sleep(1000)
//
//     await axios.get('https://jsonplaceholder.typicode.com/users')
//     const count2  = 4+5
// }


// function getUser() {
//     return new Promise((resolve, reject) => {
//
//         const result =  axios.get('https://jsonplaceholder.typicode.com/users')
//
//
//
//         reject('result not found')
//     })
// }


// console.log(getUser())

// const response = getUser().then((data ) => {
//     console.log("completed" )
//     console.log({data: data.data})
// }).catch((error) => {
//     console.log('catch block',error)
// }).finally(() => {
//     console.log('compled always')
// })





