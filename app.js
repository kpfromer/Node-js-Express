"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;

const app = express();

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
];

//app.set defines different settings in express
//this sets the the file extension default
//DOCUMENTATION: If the path does not contain a file extension, then the view engine setting determines the file extension.
app.set("view engine", "pug");
//this sets where the express looks for views default is views
//DOCUMENTATION: A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array.
app.set("views", `${process.cwd()}/templates`);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
    // res.end();
});

app.get("/cards", (req, res) => {
    const locals = {};

    locals.prompt = "Who is buried in Grant's tomb?";
    locals.hint = "Think about about whose tomb it is!";
    locals.colors = colors;

    res.render('card', locals);
});

app.get("/hello", (req, res) => {
    res.render("hello")
});

app.post("/hello", (req, res) => {
    res.render("hello", {name: req.body.username});
});



app.get("/helloworld", (req, res) => {
    res.send("<h1>hello, world!</h1>");
});


app.listen(port, () => {
    console.log(`The application is running on http://localhost:${port}`);
});