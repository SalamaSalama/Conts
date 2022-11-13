var express = require('express');
var port = 3000;

var bodyParser = require("body-parser");

var BASE_API_PATH = "/api/v1"

var conts = [
    {"name":"peter","phone":4444},
    {"name":"john","phone":5555}
];




console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());


app.get("/",(req,res) =>{

    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/conts",(req,res) =>{

    console.log(Date() + " - GET /conts");
    res.send(conts);
});

app.post(BASE_API_PATH + "/conts",(req,res) =>{

    console.log(Date() + " - POST /conts");
    var cont = req.body;
    conts.push(cont);
    res.sendStatus(201);
});


app.listen(port);
console.log("Server ready!");