import fs from 'fs'
import zlib from 'zlib'

const readStream = fs.createReadStream('text.txt', 'utf8');
const writeStream = fs.createWriteStream('new-text','utf8')
// const compressStream = zlib.createGzip();

// readStream.on('data', (chunk) => {
//   console.log('---------');
//   console.log(chunk.toString());
//   writeStream.write('\n ---CHUNK START--- \n');
//   writeStream.write(chunk);
//   writeStream.write('\n ---CHUNK END--- \n');
// });

const handleError = () => {
    console.log('Error');
    readStream.destroy();
    writeStream.end('Finished with error...');
};

readStream
    .on('error', handleError)
    // .pipe(compressStream)
    .pipe(writeStream)
    .on('error', handleError);