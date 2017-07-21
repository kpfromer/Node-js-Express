"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());


app.use((req, res, next) => {
    console.log('One!');
    req.thisisanything = 'hello';
    next();
});

app.use((req, res, next) => {
    console.log('Two!');
    console.log(req.thisisanything);
    next();
});

app.use('/error', (req, res, next) => {
   const err = new Error("Oh no!");
   err.statusCode = 500;
   next(err);
});


const routes = require('./routes');//no need to include index.js since it defaults to that!

app.use(routes);

//runs if no router was found

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err)
});


app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.statusCode);
    res.render("error");
});


app.listen(port, () => {
    console.log(`The application is running on http://localhost:${port}`);
});