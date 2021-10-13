const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql2');

const app = new Koa();

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

const query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        connection.query(sql, values, ( err, rows) => {
            if ( err ) {
                reject( err )
            } else {
                resolve( rows )
            }
        })
    })
}

app.use(bodyParser());

const router = new Router();

router.get('/', async (ctx, next) => {
    console.log('123')
    ctx.body = "hello world";
})

router.get('/api/user', async (ctx, next) => {
    const getUserSql = 'select * from user';
    const data = await query(getUserSql);
    ctx.body = data;
})

app.use(router.routes());
app.use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('server is alerday start')
});