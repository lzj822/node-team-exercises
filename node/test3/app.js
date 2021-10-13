const http = require('http');
const url = require('url');
const mysql = require('mysql2');

const port = 3000;
const connection = mysql.createConnection({
    host: '111.229.183.49',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'test'
})

connection.connect(err => {
    if (err) throw err;
    console.log('mysql connected successed!');
})

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
            const getUserSql = 'select * from user';
            connection.query(getUserSql, (err, result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
                return;
            })
        } else if (method === 'POST') {
            let postData = '';
            req.on('data', chunk => {
                postData = postData + chunk;
            })

            req.on('end', () => {
                const data = JSON.parse(postData);
                const userAddSql = 'insert into user(name, age) values(?, ?)';
                const param = [data.name, data.age];

                connection.query(userAddSql, param, (err, result) => {
                    if (!err) {
                        res.end('success!');
                    }
                })
            })
        }
    }
})

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}/`);
})