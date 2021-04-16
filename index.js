/**
 * Main index.js file
 */

// Static variables
var PORT = process.env.PORT || 80;

// Dependencies
var http = require("http");
var express = require("express");
var logger = require("morgan");
var request = require("request");
var path = require("path");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// app specific dependencies
var controller = require("./controller");

// initialize express app instance
var app = express();
app.server = http.createServer(app);

// server static pages
app.use(express.static(path.join(__dirname, "/public")));

// Set views
app.set("views", path.join(__dirname, "/views"));

// Set Handlebars as view engine
var hbs = exphbs.create({
    layoutsDir: "views/layouts",
    defaultLayout: "main"
});

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// serve index.html which will be
app.use("/", controller);

app.server.listen(PORT, function() {
    console.log("App started on port " + PORT);
});

module.exports.app;