import fs from 'fs'

console.log('START') //1

setTimeout(() => console.log('setTimeout 1'), 0);                      //A
setImmediate(() => console.log('setImmidiate'));                              //B

fs.readFile('/index', () => {                                           //C
    setTimeout ( () => console.log('readFile setTimeout'), 0);         //D
    setImmediate(() => console.log('readFile setImmediate'));                 //E
    process.nextTick(() => console.log('readFile Next Tick'));                //F
});

new Promise(() => {
    console.log("promise sync")
})

Promise.resolve()
    .then(() => {                                                                      //G
        console.log('Promise'); // 4
        process.nextTick(() => console. log('Promise Next Tick'));// 5         //H
    })

fu

process.nextTick(() => console. log('Next Tick')); //3                         //I
setTimeout ( () => console. log('setTimeout 2'), 0);//                  //J

console. log('END'); //2


// fs.readFile('/index', () => {                                           //C
//     setTimeout ( () => console.log('readFile setTimeout'), 0);         //D
//     setImmediate(() => console.log('readFile setImmediate'));                 //E
//     process.nextTick(() => console.log('readFile Next Tick'));                //F
// });

