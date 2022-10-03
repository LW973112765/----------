//连接数据库  1.安装mysql 2.创建连接
const mysql = require('mysql')

//创建数据库连接
const db = mysql.createConnection({
    host: '127.0.0.1', //数据域名 地址
    user: 'root', //数据名称
    password: '123456', //数据库密码 xampp集成
    database: 'myblog1',
    port: '3306'
})
module.exports = db
