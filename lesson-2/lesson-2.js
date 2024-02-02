function sleep (ms) {
    return new Promise((resolve, reject) => {
        console.log('waiting for 3000 ms ')
        setTimeout(() => {
            resolve()
        }, ms)
    })
}


async function test () {
    const count1 = 3+5 ;

    console.log({count1})
    // sleep(3000)

    await sleep(3000)

    const count2 = 5+7

    console.log({count2})

    return 'done'
}

// console.log(test ())

test()

// const requestToServer = async () => {
//     await sleep(6000)
//     // return new Promise((resolve, reject) => {
//     //
//     //     return resolve('response from server')
//     // })
//
//     return {controllerData: 'some data'}
// }
//
// const timeout = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(null), 5000)
//
//     })
// }


// async function getController( ) {
//     const controllerPromise =  requestToServer()
//     const timeoutPromise =  timeout()
//
//     console.log({controllerPromise,timeoutPromise})
//
//     const result = await Promise.race([controllerPromise, timeoutPromise])
//
//
//     console.log({ result })
//
//     return result
// }

// getController()








