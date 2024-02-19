import fs from 'fs';
import  { Readable } from 'stream';

class FileReader extends Readable {
    constructor(filePath, options) {
        super(options);
        this.filePath = filePath;
    }

    _read() {
        const fileStream = fs.createReadStream(this.filePath);
        fileStream.on('data', (chunk) => {
            // Отправляем данные в поток
            if (!this.push(chunk)) {
                // Если не можем отправить данные (буфер потока переполнен), приостанавливаем поток чтения файла
                fileStream.pause();
            }
        });

        fileStream.on('end', () => {
            // Завершаем поток чтения файла
            this.push(null);
        });

        fileStream.on('error', (err) => {
            // Если произошла ошибка при чтении файла, отправляем ее в поток
            this.emit('error', err);
        });

        this.on('resume', () => {
            // Если потребитель возобновил чтение данных из потока, продолжаем чтение файла
            fileStream.resume();
        });
    }
}

// Использование:
const filePath = 'example.txt';
const fileReader = new FileReader(filePath);

fileReader.on('data', (chunk) => {
    console.log(chunk.toString());
});

fileReader.on('end', () => {
    console.log('File reading complete');
});

fileReader.on('error', (err) => {
    console.error('Error reading file:', err);
});