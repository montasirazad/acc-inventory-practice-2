const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//routes

const productRoute = require('./routes/product.route')

// SCHEMA → MODEL → QUERY





app.get('/', (req, res) => {
    res.send('testing ')
});

// POST data 

app.use('/api/v1/product', productRoute)



module.exports = app;