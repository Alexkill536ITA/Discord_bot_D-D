/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

// Load module
var mysql = require('mysql');
// Initialize pool
var pool = mysql.createPool({
    connectionLimit: process.env.DATABASE_SQL_POOL,
    host: process.env.DATABASE_SQL_HOST,
    user: process.env.DATABASE_SQL_USER,
    password: process.env.DATABASE_SQL_PASSWORD,
    database: process.env.DATABASE_SQL_DATABASE
});
module.exports = pool;