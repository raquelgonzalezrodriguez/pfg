const mysql2 = require('mysql2');

/* Creamos y hacemos la conexión a la base de datos MySQL */
const database = mysql2.createConnection({
    host: 'db4free.net',
    user: 'raquel',
    password: '12345678',
    database: 'raquelbbdd'
  });

module.exports = database;