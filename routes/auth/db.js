const mysql = require('mysql');

let pool = mysql.createPool({
  host: process.env.MYSQL_DEV_HOST,
  port: process.env.MYSQL_DEV_PORT,
  user: process.env.MYSQL_DEV_USER,
  password: process.env.MYSQL_DEV_PASSWORD,
  database: process.env.MYSQL_DEV_DATABASE,
  connectionLimit: 30
});

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if(!err) {
      callback(null,conn);
    }
  });
}

module.exports = getConnection;