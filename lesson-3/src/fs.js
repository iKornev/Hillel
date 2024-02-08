import fs from 'fs';


fs.readFile('index.js', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
    } else {
        console.log('Содержимое файла:', data);
    }
});


const contentToWrite = 'Новое содержимое файла\n';


fs.writeFile('newFile.txt', contentToWrite, (err) => {
    if (err) {
        console.error('Ошибка записи файла:', err);
    } else {
        console.log('Файл успешно записан');
    }
});