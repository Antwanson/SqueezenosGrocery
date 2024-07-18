// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// fetch data from the database
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM your_table';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
