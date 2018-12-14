var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'locadora'
});

connection.connect( (err) => {
    if (err) console.log("Erro ao conectar ao banco de dados")
});

module.exports = connection;