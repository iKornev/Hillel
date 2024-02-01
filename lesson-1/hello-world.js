// const http = require('node:http');

import http from 'node:http'
// Создаем HTTP-сервер

const server = http.createServer((req, res) => {
    // Устанавливаем заголовок ответа с типом содержимого
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // Указываем кодировку UTF-8

    // Обработка URL-адреса запроса
    if (req.url === '/') {
        // Если запрос к корневому URL, отправляем сообщение приветствия
        res.end('Привет, это главная страница!');
    } else if (req.url === '/about') {
        // Если запрос к /about, отправляем информацию о сервере
        res.end('Это страница "О нас"');
    } else if (req.method === 'POST' && req.url === '/postHTTP'){
        let body = '';

        // Обработка данных при получении частями
        req.on('data', (chunk) => {
            body += chunk.toString(); // Преобразуем буфер в строку и добавляем к общему телу запроса
        });

        // Действия по завершению получения данных
        req.on('end', () => {
            console.log('Тело POST запроса:', body);
            res.end('POST запрос успешно получен');
        });
    } else {
        // Если запрос не соответствует ни одному известному URL, отправляем сообщение об ошибке 404
        res.statusCode = 404;
        res.end('Ошибка 404: Страница не найдена!');
    }
});

// Устанавливаем порт и IP-адрес, на котором будет слушать сервер
const port = 3000;
const hostname = '127.0.0.1';

// Начинаем прослушивание запросов на указанном порту и хосте
server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});