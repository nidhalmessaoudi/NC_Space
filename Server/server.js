import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

// Routes
import routes from "./routes/routes.js";

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes);

let port = process.env.PORT;
if (port === null || port === "") port = 3000;

app.listen(3000, () => {
    console.log("Server has started Successfully.");
});