import fs from 'fs'

//buffer.length is a property of the Buffer object that represents the length (in bytes) of the buffer's contents.

// if utf8 not provided results will be a Buffer else string
const buffer = fs.readFileSync('1-readFileSync.js' );
// const string = fs.readFileSync('1-readFileSync.js', 'utf8');

const src = buffer.toString()

console.log('Buffer length:' + buffer.length); // bytes
// console.log('Buffer length:' + string.length); // bytes
console.log (buffer);
console.log(src);