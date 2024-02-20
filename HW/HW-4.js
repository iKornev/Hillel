const fs = require('fs');
const { Transform } = require('stream');
const EventEmitter = require('events')

const inputStream = fs.createReadStream('input.txt', 'utf8');
const outputStream = fs.createWriteStream('output.txt', 'utf8');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const transformedData = chunk.toString().toUpperCase();
        callback(null, transformedData);
    }
});

inputStream.pipe(transformStream).pipe(outputStream);

console.log('Transformation completed!');

const eventEmitter = new EventEmitter();

eventEmitter.on('purchase', (product) => {
    console.log(`Товар ${product.name} (${product.id}) был куплен.`);
});
eventEmitter.emit('purchase', { id: 123, name: 'Ноутбук', price: 1500 });


eventEmitter.on('addToCart', (product) => {
    console.log(`Товар ${product.name} (${product.id}) добавлен в корзину.`);
});
eventEmitter.emit('addToCart', { id: 456, name: 'Смартфон', price: 800 });



