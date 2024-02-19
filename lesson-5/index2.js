import express from 'express';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';
import multer from 'multer';

const app = express();
const port = 3001;

const maxSize = 500 * 1024 * 1024;

const upload = multer({
    limits: { fileSize: maxSize },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "video/mp4") {
            cb(null, true);
        } else {
            cb(new Error("Only mp4 video files are allowed for download"));
        }
    }
}).single('video');

app.post('/upload', (req, res) => {
    try {
        const memoryBefore = process.memoryUsage();
        upload(req, res, (err) => {
            if (err) {
                console.log({ err });
                res.status(500).send("Video loading error");
            } else {
                const file = req.file;

                if (!file) {
                    res.status(400).json({ status: 400, error: "File not found" });
                    return;
                }

                const { buffer, originalname } = file;
                const filename = `${Date.now()}-${originalname}`;
                // const filepath = path.join(__dirname, 'uploads', filename);

                const memoryAfter = process.memoryUsage();

                const readableStream = new Readable({
                    read() {
                        this.push(buffer);
                        this.push(null);
                    }
                });

                const writableStream = fs.createWriteStream('uploads.mp4');

                readableStream.pipe(writableStream);

                writableStream.on('finish', () => {
                    console.log('Memory before:', memoryBefore);
                    console.log('Memory after:', memoryAfter);
                    res.send('File uploaded successfully');
                });

                writableStream.on('error', (error) => {
                    res.status(500).json({ status: 500, error });
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
