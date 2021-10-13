const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {

    const urlObject = url.parse(req.url);
    const { pathname } = urlObject;

    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    }

    if (pathname === '/api/user') {
        const method = req.method;
        if (method === 'GET') {
            const resData = [
                {
                    id: 1,
                    name: '小明',
                    age: 18
                },
            ];
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(resData));
            return;
        }
    }
})

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}/`);
})