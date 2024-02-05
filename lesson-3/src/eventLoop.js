import fs from 'fs'

console.log('First')
setTimeout(() => {console.log('Set timeout1')}, 0)
setTimeout(() => {console.log('Set timeout2')}, 100)
setImmediate(() => {console.log('Set immediate')})

Promise.resolve()
    .then(() => {
        process.nextTick(() => console. log('Promise Next Tick'));
    })

fs.readFile('index.js', 'utf8', (err, data) => {
   console.log('fs completed ')

    new Promise((resolve) => {
        console.log('Promise sync');
        resolve()
    }).then(() => {
        console.log('Promise 2');
        process.nextTick(() => console. log('Promise Next Tick'));
    })

    fs.readFile('index.js', () => {
        console. log('fs in fs ')
    })

    process.nextTick(() => console. log('Next Tick'));
});

process.nextTick(() => console. log('Next Tick'));

setTimeout ( () => console. log('Set timeout3'), 0);

console.log('Last')

