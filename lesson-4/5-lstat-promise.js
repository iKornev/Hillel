import * as fs from 'fs';
// import { promisify } from 'util'
import { promises as fsPromises } from 'fs'

//
const fileNames = ['1-readFileSync.js', 'n-untitled.js', '3-async.js'];
const promises = fileNames.map((fileName) => fs.promises.lstat(fileName));
Promise.allSettled(promises).then(console.dir);


// const promisifiedFunction  = promisify(fs.lstat)
// promisifiedFunction('1-readFileSync.js').then((data) => { console.log({ data })})


// const lstatAsync = promisify(fs.lstat);
//
// const fileNames = ['1-readFileSync.js', 'n-untitled.js', '3-async.js'];
// const promises = fileNames.map((fileName) => lstatAsync(fileName));
// Promise.allSettled(promises).then(console.dir);