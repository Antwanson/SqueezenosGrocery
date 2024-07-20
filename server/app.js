// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  // Add this line
// const connection = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Add this line
app.use(bodyParser.json());
app.use(express.static('public')); // Serve your HTML file from a 'public' directory

// GET route to fetch data from the database
app.get("/test", (req, res) => {
  res.json(results);
});

// POST route to handle form submission
app.post("/test", (req, res) => {
  const { sName, sPrice, sQuantity, sExpir, fInfo } = req.body;
    console.log('Received fruit data:', req.body);
  
  res.json({ message: 'Fruit added successfully', data: req.body });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});