import { Readable, Writable, Duplex, Transform } from 'stream'

// Readable realization and usage
const readableStream = new Readable({
    read(size) {
        this.push('Hello, ');
        this.push('world!');
        this.push(null);
    }
});

readableStream.on('data', (chunk) => {
    console.log(chunk.toString());
});

// Writable realization and usage
const writableStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString().toUpperCase());
        callback();
    }
});

writableStream.write('hello, ');
writableStream.write('world!');

// Duplex realization and usage
const duplexStream = new Duplex({
    read(size) {

        this.push('hello, ');
        this.push('world!');
        this.push(null);
    },
    write(chunk, encoding, callback) {

        console.log(chunk.toString().toUpperCase());
        callback();
    }
});

duplexStream.on('data', (chunk) => {
    console.log('Received:', chunk.toString());
});

duplexStream.write('test ');


// Transform realization and usage
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        // Преобразование данных
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

transformStream.on('data', (chunk) => {
    console.log('Transformed:', chunk.toString());
});

transformStream.write('hello, ');
transformStream.write('world!');
transformStream.end();