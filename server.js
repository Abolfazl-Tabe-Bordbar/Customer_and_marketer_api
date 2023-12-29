const express = require("express");
const app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// --------------------------------------------------------------
const mongoose = require("mongoose");
let DB_URL = "mongodb://0.0.0.0:27017/api_for_marketers";
let conn = mongoose.connect(DB_URL);
conn.then(
    (db) => {
        console.log("connection ok");
    },
    (err) => {
        console.log("connection in not ok");
    }
)
// --------------------------------------------------------------


// ----------------------------------------------------------
var cors = require('cors')


let corsOptions = {
    origin: '*',
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// ----------------------------------------------------------


// ----------------------------------------------------------
const marketer_routes = require("./modules/routes/marketer.js");
const admins_routes = require("./modules/routes/admins.js");
app.use("/marketer",cors(corsOptions) ,marketer_routes);
app.use("/admins",cors(corsOptions) ,admins_routes);

// ----------------------------------------------------------


app.use((req, res) => {
    res.json({
        status: false,
        message: "This route is not in my api"
    });
});



app.listen(4000);
