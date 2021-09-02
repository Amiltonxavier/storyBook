const express = require("express");
const app = express();
const dotenv = require('dotenv');
const routerBook = require("./router/book.js");
const routeBook = require("./router/user.js");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());


app.use("/api", routerBook);
app.use("/api", routeBook);
mongoose.connect(
    process.env.DBCONNECTION,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
).then(
    () => {
        console.log(`Is Already done`)
    }
).catch ((err) => {
    console.log(`Something is wrong with db ${err}`)
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})