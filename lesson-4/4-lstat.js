'use strict';
import fs from 'fs'

const files = ['1-readFileSync.js', 'n-untitled.js', '3-async.js'];

const stats = new Array(files.length);

console.log({ stats })

let rest = files.length;

const printResult = () => {
    console.dir({ stats });
};

fs.lstat('1-readFileSync.js', (err, stat) => {
    if (err) {
        console.log(`File ${'1-readFileSync.js'} not found`);
    } else {
     console.log({ stat });
    }
});

// files.forEach((file, i) => {
//     console.dir({ file, i });
//     fs.lstat(file, (err, stat) => {
//         if (err) {
//             console.log(`File ${file} not found`);
//         } else {
//             stats[i] = stat;
//         }
//         if (--rest) return;
//         printResult();
//     });
// });