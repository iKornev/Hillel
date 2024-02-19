import { Readable, Writable } from 'stream';
import fs from 'fs'

const readableStream = new Readable({
    read() {}
});

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        fs.writeFile('video1.mov', chunk, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                callback(err);
            } else {
                callback();
            }
        });
    }
})

const filePath = 'cat.mp4';

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    readableStream.push(data);
    readableStream.push(null);
});

readableStream.pipe(writableStream);