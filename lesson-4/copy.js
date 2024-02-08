import fs from 'fs'

const readable = fs.createReadStream('12-readable.js');

readable.on('error', (error) => {
    console.log({ error });
});

readable.on('end', () => {
    console.log({ event: 'end' });
});

readable.on('close', () => {
    console.log({ event: 'close' });
});

// Styles of reading data from streams:
// - on('data')
// - on('readable')
// - .pipe()
// - AsyncIterable

// Style: on('data')

readable.on('data', (chunk) => {
    console.log({ data: chunk });
});

// Style: on('readable')

readable.on('readable', () => {
    let data = readable.read();
    console.log({ event: 'readable' });
    while (data !== null) {
        console.log({ readable: data });
        data = readable.read();
    }
});