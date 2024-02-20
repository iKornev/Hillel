const { Readable, Writable, Duplex, Transform } = require('stream');
const multer = require('multer');
const config = require('../config/config');
const utils = require('../utils/utils');

const uploadDir = utils.createUploadsDir();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

});

const upload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSize,
  },
}).single('video');


const handleUpload = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Помилка завантаження відео.' });
    }

    if (req.file) {
      const readableStream = new Readable({
        read() {
          this.push(req.file.buffer);
          this.push(null);
        },
      });

      const writableStream = new Writable({
        write(chunk, encoding, callback) {
          callback();
        },
      });

      readableStream.pipe(writableStream);

      writableStream.on('finish', () => {
        return res.json({
          success: true,
          message: '200  Відео успішно завантажено!',
        });
      });
    } else {
      return res.json({ success: false, message: 'Файли не завантажені' });
    }
  });
};

module.exports = { handleUpload };


