const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "xiaohan",
    port: '3306',
    database: 'zhiyi'
})
connection.connect((err) => { if (err) console.log(err); else console.log("θΏζ₯ζε") });
const sql = function (s,callback) {
    connection.query(s, (err, res, file) => {
        callback(err,res,file)
    })
}
module.exports = sql;