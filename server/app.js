// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const connection = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use(express.static('public'));

// Import all routes
const routes = require('./routes');

// Use routes
app.use('/api', routes);

// GET route to test server
app.get("/api/test", (req, res) => {
  console.log("Got GET request");
  var results = "Server is on"
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});