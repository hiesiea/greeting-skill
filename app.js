"use strict";

const Alexa = require('alexa-sdk');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/greeting', (req, res) => {
    let context = {
        'succeed' : function(result) {
            res.json(result);
        },
        'fail' : function(err) {
            res.json(err);
        }
    };

    let handlers = {
        'GreetingIntent' : function() {
            let name = req.body.request.intent.slots.FirstName.value;
            this.emit(':tell', 'おはよう、' + name);
        }
    };

    let alexa = Alexa.handler(req.body, context);
    alexa.appId = req.body.session.application.applicationId;
    alexa.registerHandlers(handlers);
    alexa.execute();
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
