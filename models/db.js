'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'starwars'
});

connection.connect(function(err) {
    if (err) throw err;
    // connection.query("CREATE TABLE IF NOT EXISTS comments (" +
    //     "id INT AUTO_INCREMENT, " +
    //     "movie_id INT NOT NULL, " +
    //     "commenter_ip VARCHAR(50) NOT NULL, " +
    //     "body VARCHAR(500) NOT NULL, " +
    //     "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
    //     "PRIMARY KEY (id)" +
    //     ")", (err, res) => {
    //     if (err) { console.log(err); return }
    //     console.log('Table created', res);
    // });
});

module.exports = connection;
