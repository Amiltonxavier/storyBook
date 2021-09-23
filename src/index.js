import Express from "express";
import dotenv from 'dotenv';
import routerBook from "./router/book.js";
import routeBook from "./router/user.js";
import mongoose from "mongoose";
const app = Express();
dotenv.config();
app.use(Express.json());


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