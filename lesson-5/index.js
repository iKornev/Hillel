import http from 'http'

const server = http.createServer((req, res) => {

    console.log({req})

    // res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (req.url === '/users') {
        res.end('user API called')
    }

})


server.listen(3000, () => {
    console.log('server started on port 3000')
})