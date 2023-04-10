const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv").config();

const app = require('./app');

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database is successfully connected`.red.bold);
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening to port ${port}`.yellow.bold);
})