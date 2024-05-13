const pool = require('../config/sqldbConnect');

const sqlgetuserScore = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users ORDER BY total_score DESC LIMIT 3;', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        res.status(200).json(result); // Assuming successful response returns data
    } catch (error) {
        res.status(500).json({ 
            status_code: 500, 
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = sqlgetuserScore;
