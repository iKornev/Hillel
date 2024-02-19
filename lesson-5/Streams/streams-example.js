import express from 'express';
import fs from 'fs';
import { Writable } from 'stream';

const app = express();
const port = 8000;

app.post('/upload', (req, res) => {
    const filePath = 'uploaded.mp4';
    const fileStream = fs.createWriteStream(filePath, { flags: 'a' }); // Используем флаг 'a' для добавления данных в конец файла

    req.pipe(fileStream);

    fileStream.on('finish', () => {
        console.log('Файл успешно загружен и сохранен');
        res.send('Файл успешно загружен и сохранен');
    });

    fileStream.on('error', (error) => {
        console.error('Ошибка записи файла:', error);
        res.status(500).send('Ошибка загрузки файла');
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
