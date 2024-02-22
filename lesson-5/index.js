import express from 'express';
import fs, { createWriteStream } from 'fs';
import { Writable } from 'stream';
import expressStatusMonitor from 'express-status-monitor';

const app = express();
const port = 8000;


app.use(expressStatusMonitor());

app.get('/status',  expressStatusMonitor().pageRoute)

app.post('/upload', async(req, res) => {
    let contentLength = 0; // Initialize content length counter
    const maxSizeBytes = 19000000;

    req.on('data', (chunk) => {
        // Accumulate the size of each chunk
        contentLength += chunk.length;

        console.log({contentLength})
        if (contentLength > maxSizeBytes) {
            // If the accumulated size exceeds the maximum limit, return an error
            res.status(400).send('File size exceeds the limit');
            req.destroy(); // Close the request stream to stop receiving data
        }
    });


    // if (contentLength > maxSizeBytes) {
    //     // Если размер файла превышает максимальный размер, возвращаем ошибку
    //     res.status(400).send('File size exceeds the limit');
    //     return;
    // }

    const writableStream = new Writable({
        async write(chunk, encoding, cb) {
            await fs.promises.appendFile('uploaded.mp4', chunk)
            cb()
        }
    });

    // const memoryBefore = process.memoryUsage();

    function write (data) {
        return new Promise((resolve) => {
            if (!writableStream.write(data)) {
                writableStream.once('drain', resolve)
            } else {
                process.nextTick(resolve)
            }
        })
    }
    // req.pipe(writableStream);

    writableStream.on('finish', () => {
        console.log('finished')
        const memoryAfter = process.memoryUsage();
        //
        // console.log('Memory before:', memoryBefore);
        console.log('Memory after:', memoryAfter);
    })


    writableStream.on('error', (err) => console.log(err))

    for await (const chunk of req) {
        await write(chunk)
    }

    writableStream.end()



    res.end('saved')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});