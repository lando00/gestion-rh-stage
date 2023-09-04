const mysql = require('mysql');

var connection = mysql.createConnection({
    port : 3306,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mndpt'
});

connection.connect((erreur) => {
    if (!erreur) {
        console.log('connecter');
    }
    else {
        console.log(erreur);
    }
});

module.exports = connection;