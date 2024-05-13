const mysql = require('mysql')

const pool = mysql.createPool({
    // connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamescore'
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connection to MySQL established');

    // Release the connection back to the pool when done with it
    connection.release();
});
module.exports=pool