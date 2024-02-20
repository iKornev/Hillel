const express = require('express');
const app = express();

const config = require('./config/config.json');

const auth = require('./middlewares/auth');
const validation = require('./middlewares/validation');

const usersController = require('./controllers/users');
const productsController = require('./controllers/products');


const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use(auth);
app.use('/user', validation);

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Виникла помилка!');
});

app.listen(config.port, () => {
  console.log(`Сервер запущено на порті ${config.port}`);
});
