import crypto from 'crypto'
import util from 'util'

process.env.UV_THREADPOOL_SIZE = 8;

const start = process.hrtime();

for (let i  = 0; i < 8; i++) {
    crypto.pbkdf2('secret', 'salt', 100000, 512, 'sha512', (err) => {
        const end = process. hrtime(start);
        console.log(util. format('crypto %d start %d end %d execute %d', i, end[0], end[1], end[0] + end[1] / 1e9));

    })
}