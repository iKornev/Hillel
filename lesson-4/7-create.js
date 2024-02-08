import fs from 'fs'

fs.appendFile('hello.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});