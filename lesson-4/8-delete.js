import { unlink } from 'node:fs';

unlink('hello.txt', (err) => {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
});