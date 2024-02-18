const express = require('express');
const uploadController = require('./controllers/uploadController');
const config = require('./config/config');

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/upload', uploadController.handleUpload);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
