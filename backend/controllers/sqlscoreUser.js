const pool = require('../config/sqldbConnect'); 

const sqlscoreUser = async (req, res) => {

    try {
        const { username, email, total_score } = req.body;
        const query = 'INSERT INTO users (username, email, total_score) VALUES (?, ?, ?)';
        pool.query(query, [username, email, total_score], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ id: result.insertId });
        });
    }

    catch (error) {
        res.status(500).send({ 
            status_code: 500, 
            message:"Internal Server Error",
            error:error.message
         });
    }
}

module.exports = sqlscoreUser