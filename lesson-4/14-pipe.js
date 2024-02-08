import fs from 'fs'

const readable = fs.createReadStream('12-readable.js', 'utf8');
const writable = fs.createWriteStream('copy.js','utf8')

readable.pipe(writable)

readable.on('end', () => {
    console.log({ event: 'end' });
});
