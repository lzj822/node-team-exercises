const express = require('express');
const mysql = require('mysql2');
const app = express();

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

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/user', (req, res) => {
    const getUserSql = 'select * from user';
    connection.query(getUserSql, (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    })
})

app.post('/api/user', (req, res) => {
    const data = req.body;
    const userAddSql = 'insert into user(name, age) values(?, ?)';
    const param = [data.name, data.age];

    connection.query(userAddSql, param, (err, result) => {
        if (!err) {
            res.send('success!');
        }
    })
})

app.listen(3000)