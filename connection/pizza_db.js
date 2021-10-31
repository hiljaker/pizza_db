const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createPool({
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'pizza_db',
    connectionLimit: 10
});

connection.getConnection((err, conn) => {
    if (err) {
        conn.release()
        console.log("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + conn.threadId);
    conn.release()
});

module.exports = connection