const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    const name = req.cookies.username;

    if(name){
        res.render("index", {name});
    } else {
        res.redirect("/hello");
    }
});

router.get("/cards", (req, res) => {
    const locals = {};

    locals.prompt = "Who is buried in Grant's tomb?";
    locals.hint = "Think about about whose tomb it is!";
    locals.colors = colors;

    res.render('card', locals);
});

router.get("/hello", (req, res) => {

    const name = req.cookies.username;

    if (name) {
        res.redirect("/");
    } else {
        res.render("hello");
    }
});

router.post("/hello", (req, res) => {

    const username = req.body.username;

    res.cookie('username', username);

    // res.render("hello", {name: username});
    res.redirect("/");
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect("/hello");
});

router.get("/json", (req, res) => {
    res.json({
        users: [
            {firstName: "Kyle", lastName: "Pfromer", age: 18},
            {firstName: "Jack", lastName: "Willis", age: 40}
        ]
    });
});

router.get("/helloworld", (req, res) => {
    res.send("<h1>hello, world!</h1>");
});

module.exports = router;