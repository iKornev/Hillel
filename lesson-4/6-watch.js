import fs from 'fs'

const watcher = fs.watch('6-watch.js', (event, file) => {
    console.log({ event, file });
});

watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
});
