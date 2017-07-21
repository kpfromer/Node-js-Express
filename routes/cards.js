const express = require("express");

const router = express.Router();

const {data} = require("../data/flashCardData.json");// same as data = require('...').data

const {cards} = data;//same as cards = data.cards

router.get('/', (req, res) => {
    const cardNumber = Math.floor( Math.random() * cards.length);
    res.redirect(`${req.baseUrl}/${cardNumber}`);
});

router.get("/:id", (req, res) => {

    const {id} = req.params;

    const name = req.cookies.username;
    const card = cards[id];
    let {side} = req.query;
    if(!side || (side !== "question" && side !== "answer")) side = "question";
    const text = card[side];

    const isQuestion = side === "question";

    const templateData = {text, id, name};

    if (isQuestion) {
        templateData.sideToShow = "answer";
        templateData.sideToShowDisplay = "Answer";
        templateData.hint = card.hint
    } else {
        templateData.sideToShow = "question";
        templateData.sideToShowDisplay = "Question";
    }



    if (isQuestion);

    res.render('card', templateData);
});

module.exports = router;