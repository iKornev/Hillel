const express = require('express');
const postRouter = require('./routes/postRouter');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express()

app.use(express.json())
app.use(postRouter)

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
    },
    apis: ['index.js'], // Шлях до файлів з коментарями
};

const specs = swaggerJsdoc(options);


/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *       404:
 *         description: failed to load data.
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use((req, res, next) => next(new Error('Route Not Found')))
// Слухач порту для запуску сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
