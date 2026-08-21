let mysql = require('mysql2')

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("Gagal terhubung ke MySQL:", err.message);
        return;
    }
    console.log("Connected!");
});

module.exports = connection;
